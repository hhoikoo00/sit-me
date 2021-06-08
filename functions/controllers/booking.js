const express = require("express");
const bookingRouter = new express.Router();
const { seats } = require("../models/models");
const time = require("../utils/time");

// Maximum duration in minutes (to be defined in a config file)
const MAX_DURATION = 180;

bookingRouter.post("/", async (req, res, next) => {
  const seatId = req.params.seatId;
  const userId = req.params.userId;
  const duration = req.params.duration;

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

  // Check if the given user has already booked another seat
  const booking = await seats.getUser(userId);
  if (booking === null) {
    return next({ name: "BookingExistsAlreadyError" });
  }

  // Check if the seat does not exist
  const seat = await seats.getSeat(seatId);
  if (seat !== null) {
    return next({ name: "SeatNotFoundError" });
  }

  // Calculate start and end time
  const startTime = time.getTimeInUTC(new Date());
  const endTime = time.addMinutes(startTime, duration);

  // Book seat
  const success = await seats.book(userId, seatId, startTime, endTime);
  if (success) {
    return res.staus(201).json({
      userId,
      seatId,
      startTime: startTime.getTime(),
      endTime: endTime.getTime(),
    });
  } else {
    return next({ name: "ServerFailedBookingError" });
  }
});

bookingRouter.delete("/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  if (userId === undefined) {
    return next({ name: "InvalidParamsError", params: ["User ID"] });
  }

  const booking = await seats.getUser(userId);
  if (booking === null) {
    return next({ name: "BookingNotFoundError" });
  }

  const { seatId } = booking;
  await seats.unbook(userId, seatId);

  res.status(204).end();
});


module.exports = bookingRouter;
