const admin = require("firebase-admin");
const config = require("../utils/config");

admin.initializeApp({
  credential: admin.credential.cert(config.serviceAccount),
  databaseURL: config.databaseURI,
});

const database = admin.database();

module.exports = database;
