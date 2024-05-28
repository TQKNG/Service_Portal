const nodemailer = require("nodemailer");
const {generateEmail} = require("./generateEmail")
require("dotenv").config();

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const message = {
    from: `MAILER <${process.env.GMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

const sendEmailToDept = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_SERVICE, // Outlook 365 SMTP server
    port: 587, // Port for TLS/STARTTLS
    secure: false,
    // service: `${process.env.HOST_SERVICE}`,
    auth: {
      user: process.env.EMAIL_HOST,
      pass: process.env.EMAIL_PASS,
    },
  });

  let config = {};

  // Verify connection configuration
  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  // Type 1: Send email to department on their visitor's sign-in
  const { subject, content } = generateEmail(options.emailType, options);

  console.log("subjectt", subject);

  if (options.emailType === 1) {
    config = {
      from: `Buzz <${process.env.EMAIL_HOST}>`,
      to: `${process.env.EMAIL_SCREENING_COORDINATOR}`,
      subject: subject,
      text: content,
      cc: [process.env.EMAIL_RECEPTION, options.cc],
    };
  } else if (options.emailType === 2) {
    config = {
      from: `Buzz <${process.env.EMAIL_HOST}>`,
      to: `${process.env.EMAIL_RECEPTION}`,
      subject: subject,
      text: content,
      cc: [process.env.EMAIL_SCREENING_COORDINATOR],
    };
  } else if (options.emailType === 3) {
    config = {
      from: `Buzz <${process.env.EMAIL_HOST}>`,
      to: `${process.env.EMAIL_RECEPTION}`,
      subject: subject,
      text: content,
      cc: [process.env.EMAIL_SCREENING_COORDINATOR],
    };
  }

  await new Promise((resolve, reject) => {
    transporter.sendMail(config, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Message sent: %s", info.messageId);
        resolve(info);
      }
    });
  });
};

module.exports = { sendEmail, sendEmailToDept };
