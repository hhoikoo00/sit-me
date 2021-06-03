const functions = require("firebase-functions").region("europe-west2");
const app = require("./app");

exports.api = functions.https.onRequest(app);
