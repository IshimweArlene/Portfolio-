import { NextResponse } from 'next/server';
import { Resend } from 'resend';

console.log('🔑 API Key loaded:', process.env.RESEND_API_KEY ? 'YES' : 'NO');
console.log('🔑 API Key starts with:', process.env.RESEND_API_KEY?.substring(0, 10));

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  console.log('🎯 API route hit!');
  
  try {
    const body = await request.json();
    const { name, email, location, subject, message } = body;

    console.log('📧 Form submission received:', { name, email, location, subject });

    // Validate all fields are present
    if (!name || !email || !location || !subject || !message) {
      console.error('❌ Validation failed: Missing fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('❌ Validation failed: Invalid email format');
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    console.log('✅ Validation passed, sending emails...');

    // Send email to Arlene
    try {
      console.log('📤 Attempting to send email to Arlene...');
      const emailToArlene = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'ishimwearlene74@gmail.com',
        subject: `Portfolio Contact: ${subject}`,
        replyTo: email,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #9333ea;">New Contact Form Submission</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Location:</strong> ${location}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            <div style="margin: 20px 0;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        `
      });
      console.log('✅ Email sent to Arlene:', JSON.stringify(emailToArlene));
    } catch (error: any) {
      console.error('❌ Failed to send email to Arlene:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      throw error;
    }

    // Send confirmation email to user
    try {
      console.log('📤 Attempting to send confirmation email to user...');
      const confirmationEmail = await resend.emails.send({
        from: 'Arlene ISHIMWE <onboarding@resend.dev>',
        to: email,
        subject: 'Thank you for contacting me!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #9333ea;">Thank You for Reaching Out!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for contacting me! I've received your message and will get back to you as soon as possible.</p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Here's a copy of what you sent:</strong></p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
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
      console.log('✅ Confirmation email sent to user:', JSON.stringify(confirmationEmail));
    } catch (error: any) {
      console.error('❌ Failed to send confirmation email:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      throw error;
    }

    console.log('🎉 Both emails sent successfully!');

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully! Check your email for confirmation.',
        data: { name, email, location, subject }
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Contact form error:', error);
    console.error('Error details:', error.message, error.statusCode);
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again.',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
