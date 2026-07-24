import nodemailer from 'nodemailer';

// Helper function to create transporter
const createTransporter = () => {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT || 587);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
};

// Send Booking Status Update Email
export const sendBookingStatusEmail = async ({ to, customerName, bookingId, status, message }) => {
  const transporter = createTransporter();
  const from = process.env.EMAIL_FROM || 'no-reply@baigtours.com';

  if (!transporter) {
    return { success: false, skipped: true, message: 'Email configuration is missing.' };
  }

  const mailOptions = {
    from,
    to,
    subject: `Booking ${status} - ${bookingId}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h3>Booking Update</h3>
        <p>Hello ${customerName || 'there'},</p>
        <p>${message}</p>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p>Thank you for choosing Baig Tours.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  return { success: true, skipped: false };
};

// Send Contact Response Email
export const sendContactReplyEmail = async ({ to, customerName, subject, originalMessage, adminResponse }) => {
  const transporter = createTransporter();
  const from = process.env.EMAIL_FROM || 'support@baigtours.com';

  if (!transporter) {
    return { success: false, skipped: true, message: 'Email configuration is missing.' };
  }

  const mailOptions = {
    from,
    to,
    subject: `Re: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h3>Response from Baig Tours Support</h3>
        <p>Hello ${customerName || 'Customer'},</p>
        <p>${adminResponse}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #666; font-size: 13px;"><strong>Your Original Message:</strong></p>
        <blockquote style="color: #666; font-size: 13px; margin-left: 0; padding-left: 10px; border-left: 2px solid #ccc;">
          ${originalMessage}
        </blockquote>
        <p>Best regards,<br>Baig Tours Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  return { success: true, skipped: false };
};

// Send Bulk Newsletter Campaign Email
export const sendBulkNewsletterEmail = async ({ bccEmails, subject, contentHtml }) => {
  const transporter = createTransporter();
  const from = process.env.EMAIL_FROM || 'newsletter@baigtours.com';

  if (!transporter) {
    return { success: false, skipped: true, message: 'Email configuration is missing.' };
  }

  const mailOptions = {
    from,
    bcc: bccEmails,
    subject: subject || 'Latest News & Travel Offers from Baig Tours',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        ${contentHtml}
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="font-size: 11px; color: #999; text-align: center;">
          You received this email because you subscribed to Baig Tours newsletter.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  return { success: true, skipped: false };
};