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
    subject: "Imperial SitMe - Request to release library seat",
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
    subject: `Imperial SitMe - Seat Report for seat: ${seatId}`,
    html: `Someone has reported seat ${seatId}! 
    This seat is located in ${seatInfo.areaName}`,
  };

  emailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
};

const sendQRCodes = (path) => {
  const mailOptions = {
    from: email.user,
    to: email.user,
    subject: "Imperial SitMe - Generated QR Codes",
    html: `A request was received to generate the QR 
    codes for all the seats, please find a printable PDF enclosed`,
    attachments: [
      { filename: "QRCodes.pdf", path, contentType: "application/pdf" },
    ],
  };

  emailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    }
  });
};

module.exports = { sendPingMail, sendReportMail, sendQRCodes };
