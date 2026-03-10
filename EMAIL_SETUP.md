# Email Setup Guide

The contact form is now functional and validates all fields. To actually send emails to ishimwearlene74@gmail.com AND send confirmation emails to users, you need to integrate an email service.

## Recommended: Resend (Easiest)

### Step 1: Sign Up & Install
1. Sign up at https://resend.com (free tier: 100 emails/day)
2. Install Resend:
   ```bash
   npm install resend
   ```

### Step 2: Get API Key
1. Go to your Resend dashboard
2. Navigate to API Keys
3. Create a new API key
4. Copy the key

### Step 3: Add Environment Variable
Create a `.env.local` file in your project root:
```
RESEND_API_KEY=re_your_api_key_here
```

### Step 4: Update API Route
Open `app/api/contact/route.ts` and:
1. Uncomment the import at the top:
   ```typescript
   import { Resend } from 'resend';
   ```
2. Uncomment the entire Resend code block (lines with /* ... */)
3. The code will now send TWO emails:
   - One to you (ishimwearlene74@gmail.com) with the contact details
   - One to the user as confirmation

### Step 5: Test
1. Restart your dev server: `npm run dev`
2. Fill out the contact form
3. Check both inboxes!

## What Happens Now:

### Email to You (ishimwearlene74@gmail.com):
- Subject: "Portfolio Contact: [User's Subject]"
- Contains: Name, Email, Location, Subject, Message
- Reply-To: User's email (so you can reply directly)

### Confirmation Email to User:
- Subject: "Thank you for contacting me!"
- Contains: Personalized greeting, copy of their message
- Professional signature with your name
- Note that it's an automated email

## Current Status:
- ✅ Form validation (all fields required)
- ✅ Email format validation
- ✅ API endpoint created
- ✅ Dual email system ready (to you + confirmation to user)
- ✅ Professional HTML email templates
- ✅ Form data logged to console
- ⏳ Waiting for Resend API key

## Testing Without Resend:
The form currently logs both emails to the console so you can see what will be sent. Once you add the Resend API key and uncomment the code, real emails will be sent!

## Troubleshooting:
- Make sure `.env.local` is in your `.gitignore`
- Restart dev server after adding environment variables
- Check Resend dashboard for email logs
- Free tier limit: 100 emails/day (50 to you + 50 confirmations)

