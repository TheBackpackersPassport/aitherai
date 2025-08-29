import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { websitePackages } from '../../../lib/packages';

// Resend client will be instantiated at runtime inside the handler when API key is present

// Public logo URL for email (emails require absolute URLs for images)
const LOGO_URL = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://aitherai.dev'}/images/Aitherai%20.dev.png`;

// Strongly-typed contact form payload
interface ContactFormData {
  fullName: string;
  email?: string;
  companyName?: string;
  phone?: string;
  howDidYouHear?: string;
  packageInterest?: string;
  businessType?: string;
  timeline?: string;
  budget?: string;
  hasWebsite?: string;
  primaryGoal?: string;
  features?: string[];
  vision?: string;
}

// Reusable brand wrapper for HTML emails
function renderBrandedEmail(innerHtml: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AitherAI</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0; 
          background-color: #f8fafc;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: #ffffff; 
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .header { 
          background: linear-gradient(135deg, #9333ea 0%, #a855f7 50%, #c084fc 100%); 
          padding: 40px; 
          text-align: center; 
        }
        .logo { display:block; margin: 0 auto; max-width: 180px; height: auto; }
        .tagline {
          color: rgba(255,255,255,0.9); 
          margin-top: 8px; 
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .content { padding: 40px; }
        .footer { 
          background: #f8fafc; 
          padding: 30px; 
          text-align: center; 
          font-size: 14px; 
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img class="logo" src="${LOGO_URL}" alt="AitherAI" />
          <div class="tagline">Create Without Limits</div>
        </div>
        <div class="content">${innerHtml}</div>
        <div class="footer">
          <div style="font-weight: 700; color: #9333ea; margin-bottom: 10px;">AITHER AI</div>
          <p>
            <a href="https://aitherai.dev" style="color: #9333ea; text-decoration: none;">Our Work</a> | 
            <a href="mailto:hello@aitherai.dev" style="color: #9333ea; text-decoration: none;">Contact Us</a>
          </p>
          <p style="margin-top: 15px;">
            This email was sent because you submitted an inquiry on our website.<br>
            <strong>AitherAI</strong> - Custom websites that load in 2 seconds ⚡
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Client confirmation email template
function createClientConfirmationEmail(formData: ContactFormData) {
  const { fullName, packageInterest } = formData;
  const name = fullName || 'there';
  const selectedPkg = websitePackages.find((p) => p.name === packageInterest);

  const inner = `
    <div class="greeting" style="font-size:24px;font-weight:700;color:#9333ea;margin-bottom:20px;text-align:center;">Welcome to AitherAI, ${name}! 🎉</div>
    <p class="intro-text" style="font-size:18px;color:#4b5563;text-align:center;margin-bottom:16px;">
      Thank you for expressing interest in working with us. We're excited about the possibility of creating something amazing together!
    </p>
    ${
      packageInterest
        ? `<p style="text-align:center;color:#374151;margin-bottom:24px;">
            Selected package: <strong>${packageInterest}${selectedPkg ? ` — ${selectedPkg.price}` : ''}</strong>
           </p>`
        : ''
    }
    <div class="highlight-box" style="background:linear-gradient(135deg,#f3e8ff 0%,#fae8ff 100%);border:2px solid #e9d5ff;border-radius:12px;padding:25px;margin:25px 0;">
      <h3 style="color:#9333ea;margin-top:0;">What happens next:</h3>
      <div class="steps">
        <div class="step" style="margin:15px 0;">We'll review your project details and prepare personalized recommendations</div>
        <div class="step" style="margin:15px 0;">Schedule a discovery call to understand your vision and goals</div>
        <div class="step" style="margin:15px 0;">Present a custom proposal with timeline and investment details</div>
        <div class="step" style="margin:15px 0;">Begin creating your completely custom website solution</div>
      </div>
      <p style="text-align:center;font-weight:600;color:#9333ea;font-size:18px;">📅 We aim to get back to all enquiries <strong>within 24 hours</strong></p>
    </div>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;margin:25px 0;">
      <h3 style="color:#16a34a;margin:0 0 15px 0;">Why businesses choose AitherAI:</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;">
        <div>⚡ <strong>Lightning Fast:</strong> 2-second load guarantee</div>
        <div>🎨 <strong>Completely Custom:</strong> No templates ever</div>
        <div>✨ <strong>Easy Management:</strong> WordPress-simple updates</div>
        <div>🤝 <strong>Professional Support:</strong> Training included</div>
      </div>
    </div>
    <a href="https://aitherai.dev" class="cta-button" style="display:block;background:linear-gradient(135deg,#9333ea 0%,#a855f7 100%);color:white;padding:16px 32px;text-decoration:none;border-radius:8px;font-weight:700;text-align:center;margin:25px auto;width:fit-content;">View Our Portfolio & Process</a>
    <div style="background:#fffbeb;border:1px solid #fed7aa;border-radius:8px;padding:20px;margin:25px 0;text-align:center;">
      <h4 style="color:#d97706;margin:0 0 10px 0;">Questions Before Our Call?</h4>
      <p style="color:#92400e;margin:0;">📧 <a href="mailto:hello@aitherai.dev" style="color:#d97706;">hello@aitherai.dev</a> | 📱 <a href="tel:+1234567890" style="color:#d97706;">+1 (234) 567-8900</a></p>
    </div>
    <p style="text-align:center;font-weight:600;margin:30px 0 10px 0;">Looking forward to creating something extraordinary together!</p>
    <p style="text-align:center;color:#6b7280;"><strong>Best regards,</strong><br>The AitherAI Team<br><em style="color:#9333ea;">Create Without Limits</em></p>
  `;

  return renderBrandedEmail(inner);
}

// Internal notification email template
function createInternalNotificationEmail(formData: ContactFormData) {
  const {
    fullName,
    email,
    companyName,
    phone,
    howDidYouHear,
    packageInterest,
    businessType,
    timeline,
    budget,
    hasWebsite,
    primaryGoal,
    features,
    vision,
  } = formData;

  const selectedPkg = websitePackages.find((p) => p.name === packageInterest);
  const inner = `
    <h2 style="margin:0 0 10px 0;">🚀 New Project Inquiry</h2>
    <h3 style="margin:20px 0 10px 0;">Contact Information:</h3>
    <ul style="list-style:none;padding:0;margin:0;">
      <li><strong>Name:</strong> ${fullName || 'Not provided'}</li>
      <li><strong>Email:</strong> ${email || 'Not provided'}</li>
      <li><strong>Company:</strong> ${companyName || 'Not provided'}</li>
      <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
      <li><strong>How did they hear?:</strong> ${howDidYouHear || 'Not specified'}</li>
      <li><strong>Package Interest:</strong> ${
        packageInterest
          ? `${packageInterest}${selectedPkg ? ` — ${selectedPkg.price}` : ''}`
          : 'Not specified'
      }</li>
      <li><strong>Business Type:</strong> ${businessType || 'Not specified'}</li>
      <li><strong>Timeline:</strong> ${timeline || 'Not specified'}</li>
      <li><strong>Budget:</strong> ${budget || 'Not specified'}</li>
      <li><strong>Has Website:</strong> ${hasWebsite || 'Not specified'}</li>
    </ul>
    <h3 style="margin:20px 0 10px 0;">Primary Goal:</h3>
    <p>${primaryGoal || 'Not provided'}</p>
    <h3 style="margin:20px 0 10px 0;">Features Requested:</h3>
    <p>${features && Array.isArray(features) ? features.join(', ') : 'None specified'}</p>
    <h3 style="margin:20px 0 10px 0;">Vision/Requirements:</h3>
    <p>${vision || 'Not provided'}</p>
    <hr style="margin:24px 0; border:0; border-top:1px solid #e5e7eb;" />
    <p><a href="mailto:${email}?subject=Re: Your AitherAI Project Inquiry">Reply to ${fullName}</a></p>
  `;

  return renderBrandedEmail(inner);
}

// Plain-text fallbacks
function createClientConfirmationText(formData: ContactFormData) {
  const { fullName, packageInterest } = formData;
  const name = fullName || 'there';
  const selectedPkg = websitePackages.find((p) => p.name === packageInterest);
  return [
    `Welcome to AitherAI, ${name}!`,
    '',
    packageInterest
      ? `Selected package: ${packageInterest}${selectedPkg ? ` — ${selectedPkg.price}` : ''}`
      : undefined,
    packageInterest ? '' : undefined,
    'Thank you for your interest. Here is what happens next:',
    '- We review your details and prepare recommendations',
    '- Schedule a discovery call',
    '- Present a custom proposal with timeline and investment',
    '- Begin creating your custom website',
    '',
    'View our portfolio & process: https://aitherai.dev',
    '',
    'Questions before our call? Email hello@aitherai.dev',
  ].join('\n');
}

function createInternalNotificationText(formData: ContactFormData) {
  const {
    fullName,
    email,
    companyName,
    phone,
    howDidYouHear,
    packageInterest,
    businessType,
    timeline,
    budget,
    hasWebsite,
    primaryGoal,
    features,
    vision,
  } = formData;

  const selectedPkg = websitePackages.find((p) => p.name === packageInterest);

  return [
    'New Project Inquiry',
    '',
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Company: ${companyName || 'Not provided'}`,
    `Phone: ${phone || 'Not provided'}`,
    '',
    'How did they hear:',
    `${howDidYouHear || 'Not specified'}`,
    'Package Interest:',
    `${
      packageInterest
        ? `${packageInterest}${selectedPkg ? ` — ${selectedPkg.price}` : ''}`
        : 'Not specified'
    }`,
    'Business Type:',
    `${businessType || 'Not specified'}`,
    `Timeline: ${timeline || 'Not specified'}`,
    `Budget: ${budget || 'Not specified'}`,
    `Has Website: ${hasWebsite || 'Not specified'}`,
    '',
    'Primary Goal:',
    `${primaryGoal || 'Not provided'}`,
    '',
    'Features Requested:',
    `${features && Array.isArray(features) ? features.join(', ') : 'None specified'}`,
    '',
    'Vision/Requirements:',
    `${vision || 'Not provided'}`,
  ].join('\n');
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ContactFormData;
    
    // Log the form submission
    console.log('Contact form submission received:', data);
    
    // Send emails via Resend if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromAddress = process.env.RESEND_FROM || 'AitherAI <hello@aitherai.dev>';
    const internalTo = process.env.EMAIL_TO; // keep existing env name for internal notifications

    if (resendApiKey && fromAddress && internalTo) {
      try {
        const resend = new Resend(resendApiKey);
        // Internal notification
        await resend.emails.send({
          from: fromAddress,
          to: [internalTo],
          subject: `New Website Inquiry from ${data.fullName}`,
          html: createInternalNotificationEmail(data),
          text: createInternalNotificationText(data),
          replyTo: data.email,
        });

        // Client confirmation (if client email is provided)
        if (data.email) {
          await resend.emails.send({
            from: fromAddress,
            to: [data.email],
            subject: "Welcome to AitherAI - Let's Create Something Amazing!",
            html: createClientConfirmationEmail(data),
            text: createClientConfirmationText(data),
          });
        }

        console.log('Resend emails attempted');
      } catch (emailError) {
        console.error('Error sending via Resend:', emailError);
        // Continue anyway - don't fail the whole request just because email didn't send
      }
    } else {
      console.log('Resend not fully configured - skipping email send');
    }
    
    // Always return success to the client so the popup shows
    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process form submission' },
      { status: 500 }
    );
  }
}
