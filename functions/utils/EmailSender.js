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
    html: `Please release your seat by pressing 'Finish Studying' here:
     http://imperial-drp-sit-me.web.app/seatStatus/${seatId}`,
  };

  emailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
};

const sendReportMail = (seatId, seatInfo) => {
  const mailOptions = {
    from: email.user,
    to: email.user,
    subject: `Seat Report for seat: ${seatId}`,
    html: `Someone has reported seat ${seatId}! 
    This seat is located in ${seatInfo.areaName}`,
  };

  emailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = { sendPingMail, sendReportMail };
