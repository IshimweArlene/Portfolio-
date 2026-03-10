# Email Setup Guide

The contact form is now functional and validates all fields. To actually send emails to ishimwearlene74@gmail.com, you need to integrate an email service.

## Recommended Options:

### Option 1: Resend (Easiest - Recommended)
1. Sign up at https://resend.com (free tier: 100 emails/day)
2. Install: `npm install resend`
3. Get your API key from dashboard
4. Create `.env.local`:
   ```
   RESEND_API_KEY=your_api_key_here
   ```
5. Update `app/api/contact/route.ts`:
   ```typescript
   import { Resend } from 'resend';
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   // In the POST function, replace the TODO section with:
   await resend.emails.send({
     from: 'Portfolio <onboarding@resend.dev>',
     to: 'ishimwearlene74@gmail.com',
     subject: `Portfolio Contact: ${subject}`,
     replyTo: email,
     html: `
       <h2>New Contact Form Submission</h2>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Location:</strong> ${location}</p>
       <p><strong>Subject:</strong> ${subject}</p>
       <p><strong>Message:</strong></p>
       <p>${message}</p>
     `
   });
   ```

### Option 2: SendGrid
1. Sign up at https://sendgrid.com (free tier: 100 emails/day)
2. Install: `npm install @sendgrid/mail`
3. Get API key from dashboard
4. Add to `.env.local`: `SENDGRID_API_KEY=your_key`
5. Update the API route accordingly

### Option 3: Nodemailer with Gmail
1. Install: `npm install nodemailer`
2. Enable "App Passwords" in your Gmail account
3. Add credentials to `.env.local`
4. Configure nodemailer in the API route

## Current Status:
- ✅ Form validation (all fields required)
- ✅ Email format validation
- ✅ API endpoint created
- ✅ Form data logged to console
- ⏳ Email service integration needed (choose option above)

## Testing:
The form currently logs submissions to the console. Once you integrate an email service, emails will be sent to ishimwearlene74@gmail.com.
