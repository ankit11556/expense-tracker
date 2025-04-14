const nodemailer = require('nodemailer');

const sendEmail = async (email,subject,html) => {
 try {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user
    }
  })
 } catch (error) {
  
 }
}