const { text } = require("express");
const nodemailer = require("nodemailer");

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
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

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

  let message = {};
  let receptionistEmail = "khanhnguyen.trq@gmail.com";
  let subject = "Your guest is at the front door";
  let text = `Dear ${options.deptName},\n\n Please confirm you will come to receive your visitor. ${options.visitorName} ${options.phoneNumber}. \n\n Thank you. \n\n Buzzer greeter robot`;

  // Type 1: Send email to department on their visitor's sign-in
  if (options.emailType === 1) {
    message = {
      from: `Buzzer greeter robot <${process.env.GMAIL_USER}>`,
      to: receptionistEmail,
      subject: subject,
      text: text,
      cc: [options.cc],
    };
  }

  await new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) => {
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
