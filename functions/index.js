const functions = require("firebase-functions");
const app = require("express")();

const sampleCallback = (req, res) => {
  return res.send("Hello World!");
};

app.get("/hello", sampleCallback);

exports.api = functions.https.onRequest(app);
