const express = require("express");
const bookingRouter = new express.Router();
const { seats } = require("../models/models");
const time = require("../utils/time");

// Maximum duration in minutes (to be defined in a config file)
const MAX_DURATION = 180;

bookingRouter.get("/seat/:seatId", async (req, res, next) => {
  const seatId = req.params.seatId;
  // Check if given params are valid
  if (seatId === undefined) {
    return next({ name: "InvalidParamsError", params: ["Seat ID"] });
  }

  // TODO
});

bookingRouter.get("/user/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  // Check if given params are valid
  if (userId === undefined) {
    return next({ name: "InvalidParamsError", params: ["User ID"] });
  }

  // TODO
});

bookingRouter.post("/", async (req, res, next) => {
  const seatId = req.body.seatId;
  const userId = req.body.userId;
  const duration = req.body.duration;

  // Check if given params are valid
  if (seatId === undefined || userId === undefined || duration === undefined) {
    return next({
      name: "InvalidParamsError",
      params: ["Seat ID", "User ID", "Duration"],
    });
  }
  if (duration <= 0 || MAX_DURATION <= duration) {
    return next({
      name: "ParamOutOfRangeError",
      param: "duration",
    });
  }

  // Calculate start and end time
  const startTime = time.getTimeInUTC(new Date());
  const endTime = time.addMinutes(startTime, duration);

  // Book seat
  const { success, error } = await seats
      .book(userId, seatId, startTime, endTime);
  if (success) {
    return res.status(201).json({
      userId,
      seatId,
      startTime: startTime.getTime(),
      endTime: endTime.getTime(),
    });
  } else {
    return next({ name: error });
  }
});

bookingRouter.delete("/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  if (userId === undefined) {
    return next({ name: "InvalidParamsError", params: ["User ID"] });
  }


  const { success, error } = await seats.unbook(userId);
  if (success) {
    return res.status(204).end();
  } else {
    return next({ name: error });
  }
});

module.exports = bookingRouter;
