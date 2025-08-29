// Contact form API using Resend (HTML + text). Always returns 200 to keep UX smooth.
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type ContactFormData = {
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
};

function renderHtmlEmail(data: ContactFormData) {
  const safe = (v?: string) => (v && String(v).trim().length ? v : 'Not provided');
  const features = data.features && data.features.length ? data.features.join(', ') : 'None specified';
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background:#f8fafc; padding:24px; color:#0f172a;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          <div style="background:#111827;color:#fff;padding:16px 20px;font-weight:700;font-size:18px;">New Contact Form Submission</div>
          <div style="padding:20px;">
            <h2 style="margin:0 0 12px 0;font-size:18px;color:#111827;">Contact Information</h2>
            <ul style="list-style:none;padding:0;margin:0 0 16px 0;line-height:1.7;">
              <li><strong>Name:</strong> ${safe(data.fullName)}</li>
              <li><strong>Email:</strong> ${safe(data.email)}</li>
              <li><strong>Company:</strong> ${safe(data.companyName)}</li>
              <li><strong>Phone:</strong> ${safe(data.phone)}</li>
            </ul>
            <h2 style="margin:16px 0 8px 0;font-size:18px;color:#111827;">Project Details</h2>
            <ul style="list-style:none;padding:0;margin:0 0 16px 0;line-height:1.7;">
              <li><strong>How they heard about us:</strong> ${safe(data.howDidYouHear)}</li>
              <li><strong>Package Interest:</strong> ${safe(data.packageInterest)}</li>
              <li><strong>Business Type:</strong> ${safe(data.businessType)}</li>
              <li><strong>Timeline:</strong> ${safe(data.timeline)}</li>
              <li><strong>Budget:</strong> ${safe(data.budget)}</li>
              <li><strong>Has Website:</strong> ${safe(data.hasWebsite)}</li>
            </ul>
            <h3 style="margin:16px 0 6px 0;font-size:16px;color:#111827;">Primary Goal</h3>
            <p style="margin:0 0 12px 0;">${safe(data.primaryGoal)}</p>
            <h3 style="margin:16px 0 6px 0;font-size:16px;color:#111827;">Features Requested</h3>
            <p style="margin:0 0 12px 0;">${features}</p>
            <h3 style="margin:16px 0 6px 0;font-size:16px;color:#111827;">Vision/Requirements</h3>
            <p style="margin:0;">${safe(data.vision)}</p>
          </div>
          <div style="padding:12px 20px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;text-align:center;">AitherAI • https://aitherai.dev</div>
        </div>
      </body>
    </html>
  `;
}

function renderTextEmail(data: ContactFormData) {
  const safe = (v?: string) => (v && String(v).trim().length ? v : 'Not provided');
  const features = data.features && data.features.length ? data.features.join(', ') : 'None specified';
  return [
    'New Contact Form Submission',
    '',
    `Name: ${safe(data.fullName)}`,
    `Email: ${safe(data.email)}`,
    `Company: ${safe(data.companyName)}`,
    `Phone: ${safe(data.phone)}`,
    '',
    `How they heard about us: ${safe(data.howDidYouHear)}`,
    `Package Interest: ${safe(data.packageInterest)}`,
    `Business Type: ${safe(data.businessType)}`,
    `Timeline: ${safe(data.timeline)}`,
    `Budget: ${safe(data.budget)}`,
    `Has Website: ${safe(data.hasWebsite)}`,
    '',
    `Primary Goal:`,
    `${safe(data.primaryGoal)}`,
    '',
    `Features Requested:`,
    `${features}`,
    '',
    `Vision/Requirements:`,
    `${safe(data.vision)}`,
  ].join('\n');
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ContactFormData;
    
    // Log the form submission
    console.log('Contact form submission received:', data);
    
    // Send via Resend if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM || 'AitherAI <hello@aitherai.dev>';
    const to = process.env.EMAIL_TO;

    console.log('Environment Variables Debug:', {
      RESEND_API_KEY: process.env.RESEND_API_KEY ? `SET (${process.env.RESEND_API_KEY.substring(0, 8)}...)` : 'MISSING',
      RESEND_FROM: process.env.RESEND_FROM || 'MISSING',  
      EMAIL_TO: process.env.EMAIL_TO || 'MISSING',
      NODE_ENV: process.env.NODE_ENV || 'unknown'
    });

    if (resendApiKey && from && to) {
      try {
        const resend = new Resend(resendApiKey);

        // 1) Internal notification to business owner
        const { data: internalData, error: internalError } = await resend.emails.send({
          from,
          to: [to],
          subject: `New Website Inquiry from ${data.fullName || 'Unknown'}`,
          html: renderHtmlEmail(data),
          text: renderTextEmail(data),
          replyTo: data.email,
        });
        console.log('Resend internal email attempted', { id: internalData?.id, hasError: !!internalError });

        // 2) Customer confirmation (if customer email provided)
        if (data.email) {
          const customerHtml = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Thanks for contacting AitherAI!</title>
              </head>
              <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:#f8fafc;padding:24px;color:#0f172a;">
                <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                  <div style="background:#111827;color:#fff;padding:16px 20px;font-weight:700;font-size:18px;">Thanks for contacting AitherAI!</div>
                  <div style="padding:20px;line-height:1.7;">
                    <p>Hi ${data.fullName || 'there'},</p>
                    <p>Thanks for reaching out. We received your inquiry and our team will respond within <strong>24 hours</strong>.</p>
                    <p>In the meantime, feel free to explore our work and process:</p>
                    <p><a href="https://aitherai.dev" style="color:#4f46e5;text-decoration:underline;">https://aitherai.dev</a></p>
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
                    <p style="margin:0;">
                      AitherAI<br/>
                      Email: <a href="mailto:hello@aitherai.dev" style="color:#4f46e5;">hello@aitherai.dev</a><br/>
                      Website: <a href="https://aitherai.dev" style="color:#4f46e5;">aitherai.dev</a>
                    </p>
                  </div>
                </div>
              </body>
            </html>
          `;
          const customerText = [
            'Thanks for contacting AitherAI!',
            '',
            `Hi ${data.fullName || 'there'},`,
            'We received your inquiry and will respond within 24 hours.',
            '',
            'Visit us: https://aitherai.dev',
            '',
            'AitherAI',
            'Email: hello@aitherai.dev',
            'Website: https://aitherai.dev',
          ].join('\n');

          const { data: customerData, error: customerError } = await resend.emails.send({
            from,
            to: [data.email],
            subject: 'Thanks for contacting AitherAI!',
            html: customerHtml,
            text: customerText,
          });
          console.log('Resend customer email attempted', { id: customerData?.id, hasError: !!customerError });
        }
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
