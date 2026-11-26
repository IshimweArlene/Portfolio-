import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}[character] ?? character));

export async function POST(request: Request) {
  // Check if Resend is properly initialized
  if (!resend) {
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, location, subject, message } = body;

    if (![name, email, location, subject, message].every((value) => typeof value === 'string')) {
      return NextResponse.json({ error: 'Invalid form submission' }, { status: 400 });
    }

    const details = {
      name: name.trim(),
      email: email.trim(),
      location: location.trim(),
      subject: subject.trim(),
      message: message.trim(),
    };

    // Validate all fields are present
    if (!details.name || !details.email || !details.location || !details.subject || !details.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(details.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (details.name.length > 120 || details.email.length > 254 || details.location.length > 120 || details.subject.length > 180 || details.message.length > 5000) {
      return NextResponse.json({ error: 'Please shorten your message and try again.' }, { status: 400 });
    }

    const safeDetails = {
      name: escapeHtml(details.name),
      email: escapeHtml(details.email),
      location: escapeHtml(details.location),
      subject: escapeHtml(details.subject),
      message: escapeHtml(details.message),
    };

    const { error: recipientError } = await resend.emails.send({
      from: 'Full Stack Contact <onboarding@resend.dev>',
      to: 'ishimwearlene74@gmail.com',
      subject: `Portfolio contact: ${details.subject}`,
      replyTo: details.email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea;">New Contact Form Submission</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${safeDetails.name}</p>
            <p><strong>Email:</strong> ${safeDetails.email}</p>
            <p><strong>Location:</strong> ${safeDetails.location}</p>
            <p><strong>Subject:</strong> ${safeDetails.subject}</p>
          </div>
          <div style="margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${safeDetails.message}</p>
          </div>
        </div>
      `
    });
    if (recipientError) throw new Error('Unable to send your message');

    const { error: confirmationError } = await resend.emails.send({
      from: 'Arlene ISHIMWE <onboarding@resend.dev>',
      to: details.email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea;">Thank You for Reaching Out!</h2>
          <p>Hi ${safeDetails.name},</p>
          <p>Thank you for contacting me! I've received your message and will get back to you as soon as possible.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Here's a copy of what you sent:</strong></p>
            <p><strong>Subject:</strong> ${safeDetails.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${safeDetails.message}</p>
          </div>
          
          <p>Best regards,<br/>
          <strong>Arlene ISHIMWE</strong><br/>
          Software Engineer</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 12px; color: #6b7280;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
        </div>
      `
    });
    if (confirmationError) throw new Error('Unable to send confirmation');

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully! Check your email for confirmation.',
        data: { name: details.name, email: details.email, location: details.location, subject: details.subject }
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again.'
      },
      { status: 500 }
    );
  }
}
