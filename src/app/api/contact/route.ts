import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  message: string;
}

// Create reusable transporter
const createTransporter = () => {
  // Using environment variables for email service
  // Support for multiple email services: Gmail, SendGrid, AWS SES, or custom SMTP

  // Option 1: Gmail (requires app password)
  if (process.env.SMTP_SERVICE === "gmail") {
    console.log("Creating Gmail transporter with user:", process.env.SMTP_USER);
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Option 2: SendGrid
  if (process.env.SMTP_SERVICE === "sendgrid") {
    console.log("Creating SendGrid transporter");
    return nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  }

  // Option 3: Custom SMTP (default)
  if (process.env.SMTP_HOST) {
    console.log("Creating custom SMTP transporter with host:", process.env.SMTP_HOST);
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // No configuration found
  console.error("No email service configuration found!");
  throw new Error("Email service not configured");
};

// Email template for inquiry
const generateInquiryEmail = (data: ContactFormData) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 5px; }
          .content { padding: 20px; border: 1px solid #ddd; border-radius: 5px; margin-top: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #667eea; }
          .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Inquiry Received</h1>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">From:</span> ${data.name} (${data.email})
            </div>
            ${data.company ? `<div class="field"><span class="label">Company:</span> ${data.company}</div>` : ""}
            <div class="field">
              <span class="label">Project Type:</span> ${data.projectType}
            </div>
            <div class="field">
              <span class="label">Message:</span>
              <p>${data.message.replace(/\n/g, "<br>")}</p>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated message from your website contact form.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Confirmation email for user
const generateConfirmationEmail = (data: ContactFormData) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 5px; }
          .content { padding: 20px; border: 1px solid #ddd; border-radius: 5px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Inquiry!</h1>
          </div>
          <div class="content">
            <p>Hi ${data.name},</p>
            <p>Thank you for reaching out to us. We've received your inquiry and our team will review it shortly.</p>
            <p><strong>We typically respond within 24 hours during business hours.</strong></p>
            <p>If you have any urgent questions, please feel free to contact us via WhatsApp or phone.</p>
            <p>Best regards,<br>The FlowOps Team</p>
          </div>
          <div class="footer">
            <p>© 2024 FlowOps Systems. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Rate limiting (simple in-memory implementation)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour
const MAX_REQUESTS_PER_HOUR = 5;

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Remove old timestamps
  const recentTimestamps = timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );
  
  if (recentTimestamps.length >= MAX_REQUESTS_PER_HOUR) {
    return false;
  }
  
  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return true;
};

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-client-ip") ||
      "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({
          error: "Too many requests. Please try again later.",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name?.trim()) {
      return new Response(
        JSON.stringify({ error: "Name is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!data.email?.trim()) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!isValidEmail(data.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!data.message?.trim()) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if email service is configured
    const isConfigured = 
      process.env.SMTP_HOST || 
      process.env.SMTP_SERVICE || 
      (process.env.SMTP_USER && process.env.SMTP_PASS);
    
    if (!isConfigured) {
      console.error("Email service not configured. Environment variables missing:");
      console.error({
        SMTP_SERVICE: process.env.SMTP_SERVICE,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_USER: process.env.SMTP_USER ? "SET" : "MISSING",
        SMTP_PASS: process.env.SMTP_PASS ? "SET" : "MISSING",
      });
      return new Response(
        JSON.stringify({
          error: "Email service not available. Please try again later.",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create transporter
    const transporter = createTransporter();

    // Send inquiry email to company
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `New Inquiry: ${data.projectType} - ${data.name}`,
      html: generateInquiryEmail(data),
      replyTo: data.email,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: data.email,
      subject: "We received your inquiry - FlowOps Systems",
      html: generateConfirmationEmail(data),
    });

    // Log successful submission (optional)
    console.log(`Contact form submitted by: ${data.name} (${data.email})`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Inquiry sent successfully. Check your email for confirmation.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Failed to send inquiry. Please try again.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
