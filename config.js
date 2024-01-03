import { createTransport } from 'nodemailer';

const transporter = createTransport({
  service: 'Gmail',
  host: 'smtp.forwardemail.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.email, // your address to send email from
    // user: 'slava9678@gmail.com', // email address to send email from
    pass: 'jleh jhmc jieo qxin' // gmail account password
  }
});

export default transporter;
