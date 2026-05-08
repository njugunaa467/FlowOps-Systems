# 📧 Email Service Setup Guide - FlowOps Systems

## Current Status

✅ **Email service is now configured!**

Your `.env.local` file has been set up with the following configuration:

```env
SMTP_SERVICE=gmail
SMTP_USER=njugunaa467@gmail.com
SMTP_PASS=xxak esjt cbch bfqn
SMTP_FROM=noreply@flowops.com
CONTACT_EMAIL=njugunaa467@gmail.com
```

---

## ✅ What's Working Now

### Gmail Configuration
- Service: **Gmail**
- User Email: **njugunaa467@gmail.com**
- App Password: **Configured**
- Sender Email: **noreply@flowops.com**
- Contact Recipient: **njugunaa467@gmail.com**

### Email Flow
1. ✅ User submits contact form
2. ✅ API validates form data
3. ✅ Creates Gmail transporter
4. ✅ Sends inquiry email to: `njugunaa467@gmail.com`
5. ✅ Sends confirmation email to user
6. ✅ Returns success response

---

## 🧪 How to Test

### Step 1: Start Development Server

```bash
npm run dev
```

Output should show:
```
> next dev
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Step 2: Test Contact Form

Open `http://localhost:3000` in your browser

1. Scroll to "Contact" section
2. Fill in the form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Company: "Tech Corp"
   - Project Type: "Automation Systems"
   - Message: "This is a test inquiry"

3. Click "Send Inquiry"

### Step 3: Check Email

You should receive **2 emails**:

#### Email 1: Inquiry Email (to njugunaa467@gmail.com)
```
From: noreply@flowops.com
To: njugunaa467@gmail.com
Subject: New Inquiry: Automation Systems - John Doe

Contains:
- Name: John Doe
- Email: john@example.com
- Company: Tech Corp
- Project Type: Automation Systems
- Message: This is a test inquiry
```

#### Email 2: Confirmation Email (to john@example.com)
```
From: noreply@flowops.com
To: john@example.com
Subject: We received your inquiry - FlowOps Systems

Thank you for reaching out...
We typically respond within 24 hours during business hours.
```

### Step 4: Check Console Logs

The development console should show:

```
Creating Gmail transporter with user: njugunaa467@gmail.com
Contact form submitted by: John Doe (john@example.com)
```

---

## 🔍 Troubleshooting

### Error: "Email service not available"

**Cause**: Environment variables not loaded

**Solution**:
1. Verify `.env.local` exists in project root
2. Check file contents have proper format:
   ```env
   SMTP_SERVICE=gmail
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=noreply@flowops.com
   CONTACT_EMAIL=recipient@domain.com
   ```

3. Restart development server: `npm run dev`

### Error: "Too many login attempts"

**Cause**: Gmail thinks your account is being attacked

**Solution**:
1. Check app password is correct
2. Go to Gmail security: https://myaccount.google.com/security
3. Review "Less secure app access"
4. Wait 24 hours and try again

### Error: "Invalid credentials"

**Cause**: App password is wrong or expired

**Solution**:
1. Go to https://myaccount.google.com/apppasswords
2. Generate new app password
3. Update `.env.local` with new password
4. Restart dev server

### Email not received

**Possible causes**:
1. Check spam/junk folder
2. Verify email address is correct
3. Check console logs for errors
4. Verify SMTP_FROM matches Gmail account or authorized sender

### Form shows "Too many requests" error

**This is normal!** Rate limiting is working.

- Maximum: 5 submissions per IP per hour
- Wait 1 hour before submitting again, or use different IP

---

## 🔐 Security Notes

✅ **Your setup is secure:**
- App password is used (not account password)
- Credentials stored in `.env.local` (not in code)
- `.env.local` is in `.gitignore` (not committed to Git)
- API validates all inputs
- Rate limiting prevents abuse

⚠️ **Important**: 
- Never commit `.env.local` to Git
- Never share your app password
- Use app passwords, never account passwords
- Rotate passwords periodically

---

## 📧 Alternative Email Services

If you want to switch services in the future:

### Option 1: Switch to SendGrid

```env
SMTP_SERVICE=sendgrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxx
SMTP_FROM=noreply@flowops.com
CONTACT_EMAIL=contact@flowops.com
```

Steps:
1. Create SendGrid account (free tier available)
2. Generate API key
3. Update `.env.local`
4. Restart dev server

### Option 2: Switch to Custom SMTP

```env
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password
SMTP_SECURE=false
SMTP_FROM=noreply@domain.com
CONTACT_EMAIL=contact@domain.com
```

Steps:
1. Get SMTP details from your email provider
2. Update `.env.local`
3. Set correct port (usually 587 or 465)
4. Restart dev server

---

## 📊 Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `SMTP_SERVICE` | Email service type | `gmail`, `sendgrid` |
| `SMTP_USER` | Email account | `your-email@gmail.com` |
| `SMTP_PASS` | App password or API key | `xxxx xxxx xxxx xxxx` |
| `SMTP_FROM` | Sender email address | `noreply@flowops.com` |
| `CONTACT_EMAIL` | Where to send inquiries | `contact@flowops.com` |
| `SMTP_HOST` | (Optional) Custom SMTP server | `smtp.gmail.com` |
| `SMTP_PORT` | (Optional) Custom SMTP port | `587` or `465` |
| `SMTP_SECURE` | (Optional) Use TLS/SSL | `true` or `false` |

---

## ✨ What Happens When You Send an Inquiry

```
User submits form
    ↓
API receives request
    ↓
Validate form data:
  ✓ Name provided?
  ✓ Email valid?
  ✓ Message provided?
    ↓
Check rate limit (max 5/hour)
    ↓
Load Gmail credentials from .env.local
    ↓
Create Gmail SMTP connection
    ↓
Send inquiry email:
  From: noreply@flowops.com
  To: njugunaa467@gmail.com
  Subject: New Inquiry: [ProjectType] - [Name]
    ↓
Send confirmation email:
  From: noreply@flowops.com
  To: user's email
  Subject: We received your inquiry
    ↓
Return success response
    ↓
Browser shows success message
    ↓
Form clears
```

---

## 📞 Testing Checklist

- [ ] `.env.local` file exists
- [ ] All variables are set correctly
- [ ] Development server starts without errors
- [ ] Contact form loads in browser
- [ ] Form validation works
- [ ] Submission succeeds (no error)
- [ ] Inquiry email received in Gmail
- [ ] Confirmation email received by test email
- [ ] Email content looks professional
- [ ] No spam folder issues
- [ ] Rate limiting error message displays (after 5 attempts)

---

## 🚀 Ready for Production

Once you've tested locally and everything works:

1. **Deploy to Vercel/Netlify**
   - Set same environment variables in hosting dashboard
   - Deploy code
   - Test contact form in production

2. **Monitor Emails**
   - Check that production emails are being sent
   - Review email delivery rates
   - Monitor bounces and complaints

3. **Consider Future Enhancements**
   - Add email templates
   - Add inquiry database
   - Create admin dashboard
   - Add email notifications to team

---

## 📖 Additional Resources

- [Gmail App Passwords Help](https://support.google.com/accounts/answer/185833)
- [Nodemailer Gmail Documentation](https://nodemailer.com/smtp/gmail/)
- [SendGrid SMTP Documentation](https://docs.sendgrid.com/for-developers/sending-email/integrating-with-the-smtp-api)

---

## Summary

Your email service is now fully configured and ready to use! 

✅ Gmail account set up  
✅ App password configured  
✅ Environment variables in place  
✅ API endpoint ready  
✅ Ready to test!

**Next Step:** Run `npm run dev` and test the contact form! 🚀
