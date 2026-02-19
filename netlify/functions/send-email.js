const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    // Debug environment variables
    console.log('Environment variables available:', {
      SMTP_HOST: process.env.SMTP_HOST ? 'SET' : 'NOT SET',
      SMTP_PORT: process.env.SMTP_PORT ? 'SET' : 'NOT SET',
      SMTP_USER: process.env.SMTP_USER ? 'SET' : 'NOT SET',
      CONTACT_EMAIL: process.env.CONTACT_EMAIL ? 'SET' : 'NOT SET'
    });

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    // Check if environment variables are available
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_EMAIL) {
      console.error('Missing environment variables for email service');
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Email service not configured properly. Please check environment variables.',
          error: 'ENV_MISSING'
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
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

    // Send confirmation email to the sender
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

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully!'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Failed to send email. Please try again later.',
        error: errorMessage
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
