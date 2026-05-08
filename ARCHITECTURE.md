# 🏗️ FlowOps Systems - Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                                │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              Website (Next.js Frontend)                      │   │
│  │                                                              │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐ │   │
│  │  │   Navbar    │  │   Services   │  │  Contact Form      │ │   │
│  │  └─────────────┘  └──────────────┘  │  • Name            │ │   │
│  │  ┌─────────────┐  ┌──────────────┐  │  • Email           │ │   │
│  │  │    Hero     │  │    About     │  │  • Company         │ │   │
│  │  └─────────────┘  └──────────────┘  │  • Project Type    │ │   │
│  │  ┌─────────────┐  ┌──────────────┐  │  • Message         │ │   │
│  │  │    Work     │  │   Process    │  └────────────────────┘ │   │
│  │  └─────────────┘  └──────────────┘           ↓              │   │
│  │  ┌─────────────┐  ┌──────────────┐     [Submit Button]      │   │
│  │  │   Footer    │  │    Floating  │                          │   │
│  │  │             │  │  WhatsApp    │                          │   │
│  │  └─────────────┘  │   Button     │                          │   │
│  │                   └──────────────┘                          │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│                         HTTP POST Request                            │
│                         ↓ JSON Payload ↓                            │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER (Node.js)                         │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │         POST /api/contact/route.ts                         │    │
│  │                                                            │    │
│  │  1. Parse request body                                    │    │
│  │  2. Get client IP                                         │    │
│  │  3. Check rate limit (5/hour per IP)                      │    │
│  │  4. Validate form data:                                   │    │
│  │     ✓ Name (required, non-empty)                          │    │
│  │     ✓ Email (required, valid format)                      │    │
│  │     ✓ Message (required, non-empty)                       │    │
│  │  5. Create email transporter                              │    │
│  │  6. Generate email templates:                             │    │
│  │     ✓ Inquiry email (to company)                          │    │
│  │     ✓ Confirmation email (to user)                        │    │
│  │  7. Send emails via SMTP                                  │    │
│  │  8. Return JSON response                                  │    │
│  │                                                            │    │
│  └────────────────────────────────────────────────────────────┘    │
│                    ↙              ↘                                 │
│           (Success)              (Error)                            │
└─────────────────────────────────────────────────────────────────────┘
        ↓                                           ↓
┌──────────────────────────────────────────┐  ┌──────────────────────┐
│    Email Service Provider                │  │  Error Response      │
│                                          │  │  ┌────────────────┐  │
│  ┌────────────────────────────────────┐  │  │  │  Status: 400   │  │
│  │  Gmail / SendGrid / Custom SMTP    │  │  │  │  Error Msg     │  │
│  │                                    │  │  │  │  (Logged)      │  │
│  │  Inquiry Email:                    │  │  │  └────────────────┘  │
│  │  From: Company Email               │  │  └──────────────────────┘
│  │  To: contact@flowops.com           │  │
│  │  Subject: New Inquiry              │  │         ↓
│  │                                    │  │
│  │  Confirmation Email:               │  │    Return to Browser
│  │  From: Company Email               │  │    Show Error Message
│  │  To: User Email                    │  │
│  │  Subject: We got your message      │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│           ↓              ↓                │
│     [Gmail Inbox]  [SendGrid Logs]       │
│                                          │
└──────────────────────────────────────────┘
        ↓                    ↓
   Company Inbox        User Inbox
```

---

## Data Flow

### Form Submission Flow

```
┌──────────────────────────────────────────────────────────────┐
│ 1. USER SUBMISSION                                           │
│    ├─ Form validation (client-side)                          │
│    ├─ Show loading state                                     │
│    └─ Send JSON to /api/contact                              │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ 2. SERVER VALIDATION                                         │
│    ├─ Extract client IP                                      │
│    ├─ Check rate limit                                       │
│    ├─ Validate required fields                               │
│    ├─ Validate email format                                  │
│    └─ Return 400 if any validation fails                     │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ 3. EMAIL PREPARATION                                         │
│    ├─ Create SMTP transporter                                │
│    ├─ Generate inquiry HTML email                            │
│    ├─ Generate confirmation HTML email                       │
│    └─ Prepare email metadata                                 │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ 4. EMAIL DELIVERY                                            │
│    ├─ Send inquiry email → company inbox                     │
│    ├─ Send confirmation email → user inbox                   │
│    ├─ Log successful delivery                                │
│    └─ Return 200 success response                            │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ 5. USER FEEDBACK                                             │
│    ├─ Display success message                                │
│    ├─ Clear form fields                                      │
│    ├─ Show confirmation details                              │
│    └─ Auto-hide message after 5 seconds                      │
└──────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

```
app/
├── page.tsx (Main Layout)
│   └── Imports all components
│
└── api/
    └── contact/
        └── route.ts (Email API)
            ├── Validation logic
            ├── SMTP transporter
            ├── Email templates
            └── Error handling

components/
├── Navbar.tsx        (Navigation)
├── Hero.tsx          (Landing section)
├── Services.tsx      (Service cards)
├── Work.tsx          (Portfolio)
├── Process.tsx       (Workflow steps)
├── About.tsx         (Company info)
├── Contact.tsx       (Contact form)
├── Footer.tsx        (Footer)
├── WhatsAppButton.tsx (Floating WhatsApp)
└── Animatedlogo.tsx  (Logo animation)

styles/
├── globals.css       (Tailwind config)
└── Animations        (Framer Motion)
```

---

## Technology Stack

```
┌─────────────────────────────────────────┐
│         Frontend (Client-side)          │
├─────────────────────────────────────────┤
│ • Next.js 16.2.4 (React framework)      │
│ • React 19.2.4 (UI library)             │
│ • Framer Motion (Animations)            │
│ • Tailwind CSS 4 (Styling)              │
│ • Lucide Icons (Icon library)           │
│ • TypeScript (Type safety)              │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Backend (Server-side)           │
├─────────────────────────────────────────┤
│ • Node.js (Runtime)                     │
│ • Next.js API Routes (Endpoints)        │
│ • TypeScript (Type safety)              │
│ • Nodemailer (Email sending)            │
│ • SMTP (Email protocol)                 │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      External Services                  │
├─────────────────────────────────────────┤
│ • Gmail (Email delivery)                │
│ • SendGrid (Email service)              │
│ • Custom SMTP (Any email provider)      │
└─────────────────────────────────────────┘
```

---

## Email Flow Diagram

```
Contact Form Submission
         ↓
    Server Validates
         ↓
  Creates SMTP Client
    ↙          ↘
  Email 1     Email 2
  (Inquiry)   (Confirmation)
    ↓             ↓
    └──→ Email Service ←──┘
         (Gmail/SendGrid/SMTP)
         ↓
    ┌────┴────┐
    ↓         ↓
  To Company  To User
  Inbox       Inbox
```

---

## Rate Limiting Strategy

```
User submits form
      ↓
Extract IP address
      ↓
Check rate limit map
      ↓
Remove old entries (>1 hour old)
      ↓
Count recent entries
      ↓
┌─────────────────┬─────────────────┐
│ If < 5 entries  │ If ≥ 5 entries  │
├─────────────────┼─────────────────┤
│ ✓ Allow         │ ✗ Reject (429)  │
│ + Add timestamp │ Too many req    │
│ + Continue      │                 │
└─────────────────┴─────────────────┘
```

---

## Error Handling Flow

```
Request arrives
     ↓
┌────────────────────────┐
│ Validation Checks      │
├────────────────────────┤
│ ✓ Rate limit OK?       │─→ No → Return 429
│ ✓ Name provided?       │─→ No → Return 400
│ ✓ Email valid?         │─→ No → Return 400
│ ✓ Message provided?    │─→ No → Return 400
│ ✓ SMTP configured?     │─→ No → Return 503
│ ✓ All pass?            │─→ Yes ↓
└────────────────────────┘
     ↓
Send emails
     ↓
┌──────────────┬──────────────┐
│ Success (200)│ Error (500)  │
├──────────────┼──────────────┤
│ Email sent   │ Log error    │
│ Return OK    │ Return msg   │
└──────────────┴──────────────┘
```

---

## Security Architecture

```
┌─────────────────────────────────────────────┐
│         Security Layers                     │
├─────────────────────────────────────────────┤
│                                             │
│  Layer 1: Input Validation                  │
│  ├─ Required field check                    │
│  ├─ Email format validation                 │
│  ├─ Length limits                           │
│  └─ Sanitization (prevent XSS)              │
│                                             │
│  Layer 2: Rate Limiting                     │
│  ├─ Per-IP rate limit (5/hour)              │
│  ├─ Prevents spam                           │
│  └─ Prevents brute force                    │
│                                             │
│  Layer 3: Environment Security              │
│  ├─ No hardcoded credentials                │
│  ├─ Environment variables only              │
│  ├─ Multi-provider support                  │
│  └─ Secure SMTP connections                 │
│                                             │
│  Layer 4: Error Handling                    │
│  ├─ Generic error messages (no leaks)       │
│  ├─ Detailed server logging                 │
│  ├─ Try-catch wrapping                      │
│  └─ Error boundaries                        │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Deployment Architecture

```
┌──────────────────────────────────────────────┐
│         Development (Local)                  │
│  npm run dev                                 │
│  Port: 3000                                  │
│  Reload: Hot                                 │
└──────────────────────────────────────────────┘
              ↓ git push ↓
┌──────────────────────────────────────────────┐
│       GitHub/GitLab Repository               │
│  Stores code history                         │
│  Triggers CI/CD (optional)                   │
└──────────────────────────────────────────────┘
              ↓ Deploy ↓
┌──────────────────────────────────────────────┐
│      Production Server                       │
│  ┌────────────────────────────────────────┐  │
│  │ npm run build  (Generate .next/)       │  │
│  │ npm start      (Start server)          │  │
│  │ Env: Production variables              │  │
│  │ SSL: HTTPS enabled                     │  │
│  │ Domain: flowops.com                    │  │
│  └────────────────────────────────────────┘  │
│           ↓ Serves traffic ↓                │
│  ┌────────────────────────────────────────┐  │
│  │ /             → Static pages           │  │
│  │ /api/contact  → Dynamic endpoint       │  │
│  │ /assets       → Static files           │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
         ↓
    User Traffic
```

---

**Architecture is clean, scalable, and follows Next.js best practices!** ✨
