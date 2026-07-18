import nodemailer from 'nodemailer';

export const sendBookingStatusEmail = async ({ to, customerName, bookingId, status, message }) => {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT || 587);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const from = process.env.EMAIL_FROM || 'no-reply@baigtours.com';

  if (!host || !user || !pass) {
    return { success: false, skipped: true, message: 'Email configuration is missing.' };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from,
    to,
    subject: `Booking ${status} - ${bookingId}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
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
