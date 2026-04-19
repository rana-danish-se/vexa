import transporter from '../../config/nodemailer.js';
import { InternalError } from '../../utils/errors.js';

export const sendOtpEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: `CustomerAI <${process.env.NODEMAILER_USER}>`,
    to: toEmail,
    subject: 'Your CustomerAI verification code',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Your OTP Verification Code</h2>
        <p>Your one-time password is:</p>
        <h3 style="background-color: #f4f4f4; padding: 10px; display: inline-block; letter-spacing: 2px;">${otp}</h3>
        <p>This code expires in 10 minutes.</p>
        <p style="font-size: 12px; color: #888;">If you did not request this email, please safely ignore it.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new InternalError('Failed to send OTP email');
  }
};

/*
 * ROLE: Handles dispatching emails.
 * FUNCTIONS: sendOtpEmail(toEmail, otp).
 * ACTIONS: Constructs an HTML email template detailing the single-use verification code and utilizes the defined Nodemailer configuration to trigger the email dispatch.
 * USED BY: signup.controller.js, otp.controller.js.
 */
