const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: "Please fill in all fields",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      secure: true,
    });

    const mail = await transporter.sendMail({
      from: process.env.USER,
      to: process.env.BUSINESS,
      replyTo: email,
      subject: `${subject}`,
      html: `
            <h1>Contact Form</h1>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
            `,
    });

    // console.log("Mail Sent", mail.messageId);
    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
});

module.exports = router;
