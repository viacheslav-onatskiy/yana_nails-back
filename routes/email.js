import express from 'express';
import transporter from '../config.js';

const router = express.Router();

// @route    POST /send
// @desc     send email
// @access   Public
router.post('/', async (req, res) => {
  try {
    const mailOptions = {
      from: req.body.email,
      to: process.env.email,
      subject: req.body.subject,
      html: `
      <p>You have a new contact request.</p>
      <h3>Contact details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone number: ${req.body.phoneNumber}</li>
        <li>Review: ${req.body.review}</li>
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
          message: 'Thanks for contacting us. We will get back to you shortly.'
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
