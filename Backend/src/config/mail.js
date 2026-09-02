import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

export async function sendPasswordResetEmail(toEmail, resetToken) {
  const clientUrl =
    process.env.CLIENT_URL || "http://localhost:5173";

  const resetUrl = `${clientUrl}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from:
      process.env.FROM_EMAIL ||
      process.env.SMTP_USER ||
      '"MindPlanAI Support" <noreply@mindplanai.com>',
    to: toEmail,
    subject: "Reset Your Password - MindPlanAI",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #4F46E5; margin-bottom: 16px;">Password Reset Request</h2>
        <p>Hello,</p>
        <p>We received a request to reset the password for your MindPlanAI account.</p>
        <p>Click the button below to reset your password. This link is valid for 1 hour.</p>
        <div style="margin: 24px 0;">
          <a href="${resetUrl}" style="background-color: #4F46E5; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p style="color: #666666; font-size: 14px;">If the button doesn't work, copy and paste this URL into your browser:</p>
        <p style="color: #666666; font-size: 14px; word-break: break-all;"><a href="${resetUrl}">${resetUrl}</a></p>
        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 24px 0;" />
        <p style="color: #999999; font-size: 12px;">If you did not request a password reset, please ignore this email.</p>
      </div>
    `,
  };

  try {
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
      console.log(`Password reset email sent to: ${toEmail}`);
    } else {
      console.log(`[SMTP Not Configured] Password reset link for ${toEmail}: ${resetUrl}`);
    }
  } catch (error) {
    console.error("Error sending email via Nodemailer:", error);
    console.log(`[Fallback] Reset URL for ${toEmail}: ${resetUrl}`);
  }

  return resetUrl;
}

export default transporter;
