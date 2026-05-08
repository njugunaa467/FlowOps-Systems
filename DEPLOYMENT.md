# 🚀 Deployment Guide - FlowOps Systems

## Overview

Your Next.js application is ready to deploy. This guide covers multiple deployment options.

---

## Pre-Deployment Checklist

- [ ] Build succeeds locally: `npm run build`
- [ ] Environment variables configured in `.env.local`
- [ ] Contact form tested with real email
- [ ] All components render correctly
- [ ] No console errors
- [ ] Images/assets optimized
- [ ] Domain registered (optional)
- [ ] SSL certificate ready (hosting provides this)

---

## Option 1: Deploy to Vercel (RECOMMENDED) ⭐

**Why Vercel?**
- ✅ Created by Next.js team
- ✅ Automatic deployments from Git
- ✅ Free tier available
- ✅ Serverless functions (your API)
- ✅ Edge caching
- ✅ Custom domains

### Step 1: Prepare Your Code

```bash
# Make sure everything is pushed to GitHub
git add .
git commit -m "Final audit fixes"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel to access your repositories
4. Select your `flowops-systems` repository
5. Click "Import"

### Step 3: Configure Project

1. **Project Name**: `flowops-systems`
2. **Framework**: Select "Next.js"
3. **Root Directory**: `./`
4. **Build Command**: `npm run build` (auto-detected)
5. **Output Directory**: `.next` (auto-detected)

### Step 4: Add Environment Variables

1. Click "Environment Variables"
2. Add each variable:

```
SMTP_SERVICE = gmail
SMTP_USER = your-email@gmail.com
SMTP_PASS = your-app-password
SMTP_FROM = noreply@flowops.com
CONTACT_EMAIL = contact@flowops.com
```

**Or for SendGrid:**
```
SMTP_SERVICE = sendgrid
SENDGRID_API_KEY = your-api-key
SMTP_FROM = noreply@flowops.com
CONTACT_EMAIL = contact@flowops.com
```

3. Click "Deploy"

### Step 5: Configure Custom Domain (Optional)

1. Go to "Settings" → "Domains"
2. Enter your domain (e.g., `flowops.com`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate (usually 5 minutes)

### Verification

```bash
# Test production build
npm run build
npm start

# Visit your Vercel URL or custom domain
# Test contact form
# Check email delivery
```

---

## Option 2: Deploy to Netlify

**Why Netlify?**
- ✅ Easy GitHub integration
- ✅ Free tier with good limits
- ✅ Branch deployments
- ✅ Form handling (optional)
- ✅ Analytics included

### Step 1: Prepare Repository

```bash
git push origin main
```

### Step 2: Connect to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Sign Up" → "GitHub"
3. Authorize and select repository
4. Netlify auto-detects Next.js settings

### Step 3: Configure Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18 or higher

### Step 4: Set Environment Variables

1. Go to "Site settings" → "Build & deploy" → "Environment"
2. Add variables:

```
SMTP_SERVICE=gmail
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@flowops.com
CONTACT_EMAIL=contact@flowops.com
```

### Step 5: Deploy

1. Click "Deploy site"
2. Netlify builds and deploys automatically
3. Get your URL (e.g., `flowops-xyz.netlify.app`)

### Enable Automatic Deployments

Push to GitHub → Netlify auto-deploys
```bash
git push origin main  # Automatic deployment!
```

---

## Option 3: Deploy to Traditional Hosting

**Suitable for**: Shared hosting, VPS, Dedicated servers

### Step 1: Generate Build

```bash
npm run build
```

This creates a `.next` folder (your production app).

### Step 2: Prepare Files for Upload

```
.next/           # Required - compiled app
public/          # Required - static assets
node_modules/    # Not needed - reinstall on server
package.json     # Required
package-lock.json # Required
```

### Step 3: Upload to Server

**Option A: Using FTP**
1. Connect to your server via FTP
2. Upload all files (except node_modules)
3. Create `.env` file with variables

**Option B: Using SSH**
```bash
scp -r .next public package.json package-lock.json user@host:/var/www/app
ssh user@host
cd /var/www/app
npm install --production  # Only production deps
```

### Step 4: Create Environment File

```bash
# On your server
nano .env

# Add your variables:
SMTP_SERVICE=gmail
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@flowops.com
CONTACT_EMAIL=contact@flowops.com
```

### Step 5: Start Application

**Using Node.js directly:**
```bash
npm start
# Runs on port 3000
```

**Using PM2 (recommended):**
```bash
npm install -g pm2
pm2 start "npm start" --name "flowops"
pm2 startup
pm2 save
```

**Using Nginx as reverse proxy:**
```nginx
server {
    listen 80;
    server_name flowops.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 6: Configure SSL

```bash
# Using Let's Encrypt (free)
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d flowops.com
```

---

## Option 4: Deploy to AWS

**Why AWS?**
- ✅ Highly scalable
- ✅ Lambda functions
- ✅ Multiple regions
- ✅ Advanced security
- ✅ More expensive (but free tier available)

### Quick Setup with Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure
amplify configure

# Initialize
amplify init

# Deploy
amplify publish
```

---

## Post-Deployment

### 1. Verify Deployment

- [ ] Website loads without errors
- [ ] All pages render correctly
- [ ] Images display properly
- [ ] Links work (internal & external)
- [ ] Mobile responsive
- [ ] Contact form submits
- [ ] Emails are received

### 2. Test Contact Form

1. Fill out contact form
2. Submit
3. Check company email inbox
4. Check user confirmation email
5. Verify no spam folder issues

### 3. Monitor Performance

**Vercel/Netlify Dashboard:**
- Analytics
- Error tracking
- Performance metrics

**Google Analytics (Optional):**
```bash
npm install gtag
# Add to page.tsx
```

### 4. Set Up Error Tracking (Optional)

**Sentry.io:**
```bash
npm install @sentry/nextjs
# Configure in next.config.ts
```

---

## Troubleshooting

### "Build fails on hosting"

**Solution:**
```bash
# Ensure dependencies are listed
npm install
npm audit fix
npm run build

# Check build output
npm start
```

### "Contact form not sending emails"

**Check:**
1. Environment variables set correctly
2. SMTP credentials are valid
3. Check server logs for errors
4. Verify firewall allows SMTP port
5. Test SMTP credentials locally

### "Website shows old version"

**Solution:**
```bash
# Clear cache
# Vercel: Deployments → Redeploy
# Netlify: Deploys → Trigger deploy

# Or clear browser cache
# Chrome: Ctrl+Shift+Delete
```

### "Custom domain not working"

**Check:**
1. DNS records updated
2. SSL certificate installed
3. Domain propagation (wait 24h)
4. Use DNS checker: [whatsmydns.net](https://whatsmydns.net)

### "Too many requests" error

**This is normal!** Rate limiting is working:
- Maximum 5 form submissions per IP per hour
- Wait 1 hour or use different connection

---

## Performance Optimization

### 1. Image Optimization

```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority // For above-fold images
/>
```

### 2. Code Splitting

Next.js handles this automatically. Components lazy-load.

### 3. Caching

```js
// next.config.ts
export default {
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'max-age=60' },
      ],
    },
  ],
};
```

### 4. Monitoring

**Lighthouse in Chrome DevTools:**
- Performance
- Accessibility
- Best Practices
- SEO

---

## Maintenance

### Regular Updates

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update Next.js specifically
npm install next@latest

# Test build
npm run build
npm start
```

### Backup Strategy

- Enable automatic backups (Vercel/Netlify do this)
- Version control on GitHub
- Regular code commits
- Database backups (if added later)

### Monitoring

1. Set up uptime monitoring
2. Monitor error rates
3. Check performance metrics
4. Review analytics
5. Monitor email delivery

---

## SSL/HTTPS

All modern hosting provides free SSL:

- **Vercel**: Automatic
- **Netlify**: Automatic
- **Traditional Hosting**: Let's Encrypt (free)
- **AWS**: AWS Certificate Manager (free)

**Verify HTTPS:**
- Green lock in browser address bar
- URL starts with `https://`

---

## Domain Setup

### Register Domain

Popular registrars:
- GoDaddy
- Namecheap
- Google Domains
- Cloudflare

### Point to Hosting

**For Vercel:**
```
Add NS records from Vercel dashboard
```

**For Netlify:**
```
Add NS records from Netlify dashboard
```

**For Traditional Hosting:**
```
Point A record to server IP
Example: 192.168.1.1
```

---

## Cost Estimation

| Hosting | Startup | Monthly | Notes |
|---------|---------|---------|-------|
| Vercel | Free | Free | Free tier generous |
| Netlify | Free | Free | Free tier generous |
| AWS | Free | $5-50+ | Pay-as-you-go |
| VPS | $0 | $5-10 | Self-managed |
| Shared | $0 | $3-8 | Limited features |
| Domain | $10-15 | - | Yearly |
| Email Service | Free | Free-10 | SendGrid/Gmail |

**Recommended Startup Stack:**
- Hosting: Vercel (free)
- Domain: Namecheap ($10/year)
- Email: Gmail or SendGrid (free tier)
- **Total: $0-10 first month**

---

## Security Checklist

- [x] HTTPS enabled
- [x] Environment variables secured
- [x] Input validation
- [x] Rate limiting
- [x] No credentials in code
- [x] Security headers configured
- [ ] CORS properly set
- [ ] CSRF protection (if forms)
- [ ] Regular dependency updates
- [ ] Security monitoring

---

## Support Resources

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Node.js Docs**: [nodejs.org/docs](https://nodejs.org/docs)

---

## Summary

**Quickest Deployment:** Vercel (5 minutes)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

**Best for Control:** Traditional VPS (15 minutes)
1. Build locally
2. Upload files
3. Configure env
4. Start app

**Cost-Effective:** Netlify + Namecheap
1. Free hosting (Netlify)
2. Cheap domain ($10/year)
3. Free email (Gmail)

---

**You're ready to launch! 🚀**
