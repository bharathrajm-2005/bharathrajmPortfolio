import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #E0AA3E, #F9F295); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: #000; margin: 0; font-size: 24px;">New Contact Message</h2>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <div style="margin-bottom: 20px;">
              <strong style="color: #333; display: block; margin-bottom: 5px;">From:</strong>
              <span style="color: #666;">${name} (${email})</span>
            </div>
            <div style="margin-bottom: 20px;">
              <strong style="color: #333; display: block; margin-bottom: 5px;">Email:</strong>
              <span style="color: #666;">${email}</span>
            </div>
            <div>
              <strong style="color: #333; display: block; margin-bottom: 10px;">Message:</strong>
              <div style="background: #fff; padding: 15px; border-radius: 5px; border-left: 4px solid #E0AA3E; color: #333; line-height: 1.6;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999;">
              <p>This message was sent from your portfolio website.</p>
            </div>
          </div>
        </div>
      `,
      text: `
        New Contact Message
        
        From: ${name} (${email})
        Email: ${email}
        
        Message:
        ${message}
        
        ---
        This message was sent from your portfolio website.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to the sender (optional)
    const confirmationOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for contacting me - Bharath Raj M',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #E0AA3E, #F9F295); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: #000; margin: 0; font-size: 24px;">Thank You!</h2>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
              Hi ${name},
            </p>
            <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
              Thank you for reaching out to me through my portfolio. I have received your message and will get back to you as soon as possible.
            </p>
            <div style="background: #fff; padding: 15px; border-radius: 5px; border-left: 4px solid #E0AA3E; margin-bottom: 20px;">
              <strong>Your message:</strong><br>
              ${message.replace(/\n/g, '<br>')}
            </div>
            <p style="color: #333; line-height: 1.6;">
              Best regards,<br>
              Bharath Raj M
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(confirmationOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send email. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
