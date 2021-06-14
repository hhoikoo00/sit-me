const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("------");
  next();
};

// throwing 404 error for any unknown endpoint
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "InvalidParamsError") {
    const paramsString = error.params.reduce((acc, cur) => `${acc} or ${cur}`);

    return res.status(400).send({ error: `Missing ${paramsString}` });
  }
  if (error.name === "LoginFailureError") {
    return res.status(401).send({ error: "Failed to login" });
  }
  if (error.name === "ParamOutOfRangeError") {
    return res.status(400).send({ error: `${error.param} out of range` });
  }
  if (error.name === "SeatNotFoundError") {
    return res.status(400).send({ error: "Seat not found" });
  }
  if (error.name === "BookingExistsAlreadyError") {
    return res.status(400).send({ error: "Booking already exists for user" });
  }
  if (error.name === "BookingNotFoundError") {
    return res.status(400).send({ error: "Booking not found" });
  }
  if (error.name === "SeatAlreadyBookedError") {
    return res.status(400).send({ error: "Seat is already booked" });
  }
  if (error.name === "BreakTooRecentError") {
    return res.status(400).send({ error: "User took a break too recently" });
  }
  if (error.name === "PingUnbookedSeatError") {
    return res
        .status(400)
        .send({ error: "Attempted to release an unbooked seat" });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
