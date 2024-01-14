import dotenv from 'dotenv';
import { createTransport } from 'nodemailer';

dotenv.config();

const transporter = createTransport({
  service: 'Gmail',
  host: 'smtp.forwardemail.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.email,
    pass: process.env.pass
  }
});

export default transporter;
