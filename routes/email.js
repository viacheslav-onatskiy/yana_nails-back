import express from 'express';
import transporter from '../config.js';

const router = express.Router();

// @route    POST /send
// @desc     send email
// @access   Public
router.post('/', async (req, res) => {
  const { name, email, phoneNumber, review } = req.body;

  try {
    const mailOptions = {
      from: email,
      to: process.env.email,
      subject: `😊 Message from: ${name} | ${email}`,
      html: `
      <p>You have a new contact request.</p>
      <h3>Contact details</h3>
      <ul>
        <li><b>Name:</b> ${name}</li>
        <li><b>Email:</b> ${email}</li>
        <li><b>Phone number:</b> ${phoneNumber}</li>
        <li><b>Review:</b> <pre>${review}</pre></li>
      </ul>
      `
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).send({
          success: false,
          message: error
          // message: 'Something went wrong. Try again later',
        });
      } else {
        res.send({
          success: true,
          message: 'Thanks for contacting me. I will get back to you shortly.'
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong! Try again later.'
    });
  }
});

export default router;
