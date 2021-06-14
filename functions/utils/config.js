// use environment variables in .env file in root
// e.g. const PORT = process.env.PORT
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

// config for firebase database service account
// information must be stored in .env file
const serviceAccount = {
  "type": (process.env.SERVICETYPE || ""),
  "project_id": (process.env.SERVICEPROJECTID || "imperial-drp-sit-me"),
  "private_key_id": process.env.SERVICEPRIVATEID,
  "private_key": (process.env.SERVICEPRIVATEKEY || "").replace(/\\n/g, "\n"),
  "client_email": (process.env.SERVICECLIENTEMAIL || ""),
  "client_id": (process.env.SERVICECLIENTID || ""),
  "auth_uri": (process.env.SERVICEAUTHURI || ""),
  "token_uri": (process.env.SERVICETOKENURI || ""),
  "auth_provider_x509_cert_url": (process.env.SERVICEAUTHPROVIDERCERT || ""),
  "client_x509_cert_url": (process.env.SERVICECLIENTCERT || ""),
};
const databaseURI = (process.env.DATABASEURI || "");

const email = {
  user: process.env.EMAILUSER,
  pass: process.env.EMAILPASS,
};

module.exports = {
  serviceAccount,
  databaseURI,
  email,
};
