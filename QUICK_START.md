# 🚀 Quick Start Guide - FlowOps Systems

## ✅ What's Already Done
- All code errors fixed
- Contact form API implemented
- Build passing successfully
- Ready for deployment

---

## 📋 Next: Configure Email (5 minutes)

### Step 1: Choose Your Email Service

#### **Option A: Gmail (Recommended for Testing)**
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Create an app password (select Mail and Windows PC)
3. Copy the 16-character password

#### **Option B: SendGrid (Best for Production)**
1. Go to [sendgrid.com](https://sendgrid.com)
2. Sign up and create API key
3. Copy your API key

#### **Option C: Custom SMTP**
1. Get SMTP details from your email provider
2. Note: Host, Port, Username, Password

---

## 🔧 Step 2: Set Environment Variables

### Create `.env.local` file in project root:

#### Gmail Method:
```env
SMTP_SERVICE=gmail
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM=noreply@flowops.com
CONTACT_EMAIL=your-email@gmail.com
```

#### SendGrid Method:
```env
SMTP_SERVICE=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
SMTP_FROM=noreply@flowops.com
CONTACT_EMAIL=your-email@domain.com
```

#### Custom SMTP:
```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-username
SMTP_PASS=your-password
SMTP_FROM=noreply@flowops.com
CONTACT_EMAIL=contact@flowops.com
```

---

## 🧪 Step 3: Test Locally

```bash
# Install dependencies (if not done)
npm install

# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

1. Scroll to contact form
2. Fill in test data
3. Submit form
4. Check your inbox for:
   - **Admin email**: Inquiry from test contact
   - **User email**: Confirmation email

---

## 🌐 Step 4: Deploy

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Push code to GitHub
2. Connect repo at [netlify.com](https://netlify.com)
3. Set environment variables in Netlify dashboard

### Deploy to Other Hosts
1. Build project: `npm run build`
2. Upload `.next` folder to server
3. Set environment variables on server
4. Start with: `npm start`

---

## ✨ Step 5: Configure in Production

After deploying, add environment variables to your hosting:

**Vercel Dashboard:**
- Settings → Environment Variables
- Add all SMTP_* and CONTACT_EMAIL variables

**Netlify Dashboard:**
- Site settings → Build & deploy → Environment
- Add all environment variables

**Other Hosts:**
- Use SSH/Control Panel to set environment variables
- Or create `.env` file on server

---

## ✅ You're Done!

After these 5 steps:
- ✅ Contact form will send emails
- ✅ Users get confirmation emails
- ✅ Company gets inquiry notifications
- ✅ Rate limiting prevents spam
- ✅ Professional HTML templates

---

## 🆘 Troubleshooting

### "Email not sending"
- Check credentials in `.env.local`
- Verify SMTP_FROM matches your email provider
- Check spam/junk folder
- Review console for error messages

### "Port 587 connection refused"
- Try port 25 or 465 instead
- Set `SMTP_SECURE=true` for port 465
- Check firewall settings

### "Gmail 'Less secure apps' error"
- Use app password (not regular password)
- Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

### "Too many requests" error
- Rate limiting is working (5 per hour per IP)
- This is normal - prevents spam

---

## 📧 Email Features

✅ **Inquiry Email** - Sent to company with all details
✅ **Confirmation Email** - Sent to user confirming receipt
✅ **Form Validation** - Email format, required fields
✅ **Rate Limiting** - 5 submissions per IP per hour
✅ **Error Handling** - Clear error messages
✅ **Professional Templates** - Styled HTML emails

---

## 🔒 Security Features

✅ Rate limiting (prevents spam/brute force)
✅ Input validation (prevents injection)
✅ Email verification (valid format)
✅ Error handling (no sensitive info leaked)
✅ Environment variables (credentials never hardcoded)

---

## 📞 Support

For issues or questions:
1. Check the AUDIT_REPORT.md for detailed info
2. Review .env.example for configuration options
3. Check console logs for error messages
4. Contact your hosting provider's support

---

**Now go deploy! 🚀**
