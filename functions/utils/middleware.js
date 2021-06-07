const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("------");
  next();
};

// throwing 404 error for any unknown endpoint
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "MissingShortcodeOrPasswordError") {
    return res.status(400).send({ error: "Missing Shortcode or Password" });
  }
  if (error.name === "LoginFailureError") {
    return res.status(401).send({ error: "Failed to login" });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
