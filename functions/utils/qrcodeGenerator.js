const QRCode = require("qrcode");
const pdf = require("pdf-creator-node");
const { sendQRCodes } = require("./EmailSender");
const template = require("./qrTemplate");

const generateQR = async (url) => await QRCode.toDataURL(url);

const baseURL = "http://imperial-drp-sit-me.web.app/seatStatus/";

const pdfOptions = {
  format: "A4",
  orientation: "portrait",
  border: "10mm",
  header: {
    height: "0mm",
  },
  footer: {
    height: "0mm",
  },
};

const generateSeatLabels = async (seats) => {
  const seatObj = [];
  for (const seat of seats) {
    const seatCode = await generateQR(`${baseURL}${seat}`);
    seatObj.push({ id: seat, code: seatCode });
  }

  const outputFile = "./qrCodes.pdf";
  const document = {
    html: template,
    data: {
      seats: seatObj,
    },
    path: outputFile,
    type: "",
  };

  pdf.create(document, pdfOptions).then(console.log).catch(console.error);
  sendQRCodes(outputFile);
};

module.exports = generateSeatLabels;
