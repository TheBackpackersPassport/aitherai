import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ContactFormData;
    
    // Log the form submission
    console.log('Contact form submission received:', data);
    
    // Only try to send email if credentials are properly configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_TO) {
      try {
        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });
        
        // Format the email content
        const emailContent = `
          New Contact Form Submission
          
          Name: ${data.fullName}
          Email: ${data.email}
          Company: ${data.companyName || 'Not provided'}
          Phone: ${data.phone || 'Not provided'}
          
          How they heard about us: ${data.howDidYouHear || 'Not specified'}
          Package Interest: ${data.packageInterest || 'Not specified'}
          Business Type: ${data.businessType || 'Not provided'}
          Timeline: ${data.timeline || 'Not specified'}
          Budget: ${data.budget || 'Not specified'}
          Has Website: ${data.hasWebsite || 'Not specified'}
          
          Primary Goal:
          ${data.primaryGoal || 'Not provided'}
          
          Features Requested:
          ${data.features ? data.features.join(', ') : 'None specified'}
          
          Vision/Requirements:
          ${data.vision || 'Not provided'}
        `;
        
        // Send email
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_TO,
          subject: `New Website Inquiry from ${data.fullName}`,
          text: emailContent,
          replyTo: data.email
        };
        
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
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
