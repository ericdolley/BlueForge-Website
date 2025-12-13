const nodemailer = require('nodemailer');

const getTransporter = () => {
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
  return nodemailer.createTransport({
    jsonTransport: true
  });
};

const transporter = getTransporter();

const sendEmail = async ({ to, subject, text, html }) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER || '"Startup Website" <noreply@startup.dev>',
    to,
    subject,
    text,
    html
  });
};

const sendVerificationEmail = async ({ to, token, name }) => {
  const frontend = process.env.FRONTEND_URL || 'http://localhost:5173';
  const verificationUrl = `${frontend}/verify/${token}`;
  const subject = 'Verify your new account';
  const html = `
    <div style="font-family: sans-serif; background:#0f172a; padding:24px; color:#f8fafc; border-radius:14px;">
      <h2 style="margin-bottom:12px;">Hey ${name || 'friend'},</h2>
      <p>You signed up for the workspace studio. Click below to confirm your email and start uploading your profile.</p>
      <a href="${verificationUrl}" style="display:inline-block; padding:12px 18px; background:#0ea5e9; color:#0f172a; border-radius:8px; font-weight:600; margin-top:18px;">Verify my email</a>
      <p style="margin-top:16px; font-size:12px;">If you did not request this, you can ignore this email.</p>
    </div>`;
  await sendEmail({ to, subject, text: `${name || 'Friend'}, verify your account at ${verificationUrl}`, html });
};

const sendAdminReply = async ({ to, subject, message }) => {
  const html = `
    <div style="font-family:sans-serif; padding:20px; background:#0f172a; color:#f1f5f9; border-radius:12px;">
      <h2 style="margin-bottom:12px;">Studio reply</h2>
      <p>${message}</p>
      <p style="font-size:14px; color:#94a3b8;">We will continue supporting your journey.</p>
    </div>`;
  await sendEmail({ to, subject, text: message, html });
};

module.exports = { sendVerificationEmail, sendAdminReply };
