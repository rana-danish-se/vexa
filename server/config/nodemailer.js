import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: parseInt(process.env.NODEMAILER_PORT, 10) || 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export default transporter;

/*
 * ROLE: Configures and exports a transporter for sending emails via SMTP.
 * FUNCTIONS: None natively defined (exports the initialized transporter).
 * ACTIONS: Establishes a connection to the email rendering host using credentials from env variables.
 * USED BY: mailer.service.js
 */
