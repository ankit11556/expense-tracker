const nodemailer = require('nodemailer');

const sendEmail = async (email,subject,html) => {
 try {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS 
    }
  });

  await transporter.sendMail({
    from: `"Expense Tracker" <${process.env.EMAIL_USER}`,
    to: email,
    subject: subject,
    html: html
  })

 } catch (error) {
  console.error("Email send error:", error);
    throw error;
 }
}

module.exports = sendEmail