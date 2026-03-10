import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, location, subject, message } = body;

    // Validate all fields are present
    if (!name || !email || !location || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Location: ${location}
Subject: ${subject}

Message:
${message}
    `.trim();

    // For now, we'll use a simple mailto approach
    // In production, you should use a service like SendGrid, Resend, or Nodemailer
    console.log('Contact form submission:', {
      name,
      email,
      location,
      subject,
      message,
      recipient: 'ishimwearlene74@gmail.com'
    });

    // TODO: Integrate with an email service
    // Example with Resend (you'll need to install and configure):
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'ishimwearlene74@gmail.com',
    //   subject: `Portfolio Contact: ${subject}`,
    //   text: emailContent,
    //   replyTo: email
    // });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully!',
        data: { name, email, location, subject }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
