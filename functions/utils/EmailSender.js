const nodemailer = require("nodemailer");
const { email } = require("./config");

const emailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: email.user,
    pass: email.pass,
  },
});

const sendPingMail = (userId, seatId) => {
  const mailOptions = {
    from: email.user,
    to: userId + "@ic.ac.uk",
    subject: "Request to release library seat",
    html: "Please release seat",
  };

  emailTransporter.sendMail(mailOptions, (error, info) =>{
    if (error) {
      console.log(error);
    }
  });
};

module.exports = sendPingMail;
