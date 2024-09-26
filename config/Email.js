const nodemailer = require('nodemailer');

require("dotenv").config();

const {
  UserAC,Password
} = process.env;  
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: UserAC,
      pass: Password,
    },
    socketTimeout: 60 * 1000,
  });
  async function SendEmail(Email, Subject, message) {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: UserAC,
        to: Email,
        subject: Subject,
        text: message,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          reject(error); // Reject the promise with the error
        } else {
          console.log("Email sent:", info.response);
          resolve("Successful"); // Resolve the promise with a success message
        }
      });
    });
  }
module.exports = SendEmail