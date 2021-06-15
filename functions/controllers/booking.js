const express = require("express");
const bookingRouter = new express.Router();
const { seats, areas } = require("../models/models");
const time = require("../utils/time");
const { FREE } = require("../utils/constants");
const { sendPingMail, sendReportMail } = require("../utils/EmailSender");

// Maximum duration in minutes
// TODO define this in a config file
const MAX_DURATION = 180;

/* Get information about a specific seat */
bookingRouter.get("/seat/:seatId", async (req, res, next) => {
  const seatId = req.params.seatId;
  // Check if given params are valid
  if (seatId === undefined) {
    return next({ name: "InvalidParamsError", params: ["Seat ID"] });
  }

  const seat = await seats.getSeat(seatId);
  if (seat === null) {
    return next({ name: "SeatNotFoundError" });
  }

  const isBooked = seat.status !== FREE;
  const area = await areas.getInfo(seat.location.areaId);
  const areaName = area.areaName;

  const seatInfo = {
    seatId,
    isBooked,
    areaName,
  };

  // If booked, send additional information
  if (isBooked) {
    const userId = seat.userId;
    seatInfo.userId = userId;

    const booking = await seats.getBooking(userId);
    seatInfo.startTime = booking.startTime;
    seatInfo.endTime = booking.endTime;
    seatInfo.seatStatus = seat.status;
  }

  return res.json(seatInfo);
});

/* Get information about a specific user */
bookingRouter.get("/user/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  // Check if given params are valid
  if (userId === undefined) {
    return next({ name: "InvalidParamsError", params: ["User ID"] });
  }

  const booking = await seats.getBooking(userId);
  const hasBooked = booking !== null;

  const userInfo = {
    userId,
    hasBooked,
  };

  if (hasBooked) {
    userInfo.seatId = booking.seatId;
  }

  return res.json(userInfo);
});

/* Add a new booking */
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
  const { success, error } = await seats.book(
      userId,
      seatId,
      startTime.getTime(),
      endTime.getTime(),
  );

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

/* Remove a booking of the specified user */
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

/* Create a new breaktime for the user */
bookingRouter.put("/break/:userId", async (req, res, next) => {
  const userId = req.body.userId;
  const duration = req.body.duration;

  if (userId === undefined || duration === undefined) {
    return next({ name: "InvalidParamsError", params: ["User ID"] });
  }

  const startDate = time.getTimeInUTC(new Date());
  const endDate = time.addMinutes(startDate, duration);

  const { success, startTime, endTime, error } = await seats.setBreak(
      userId,
      startDate.getTime(),
      endDate.getTime(),
  );

  if (success) {
    return res.json({ userId, startTime, endTime });
  } else {
    return next({ name: error });
  }
});

/* Remove the breaktime for user */
bookingRouter.delete("/break/:userId", async (req, res, next) => {
  const userId = req.params.userId;

  if (userId === undefined) {
    return next({ name: "InvalidParamsError", params: ["User ID"] });
  }

  const { success, error } = await seats.finishBreak(userId);

  if (success) {
    return res.status(204).end();
  } else {
    return next({ name: error });
  }
});

bookingRouter.post("/ping/:seatId", async (req, res, next) => {
  const seatId = req.params.seatId;
  const seatInfo = await seats.getSeat(seatId);
  if (!("userId" in seatInfo)) {
    next({ name: "PingUnbookedSeatError" });
  }

  const userId = seatInfo.userId;
  sendPingMail(userId, seatId);

  return res.status(204).end();
});

bookingRouter.post("/report/:seatId", async (req, res, next) => {
  const seatId = req.params.seatId;
  const seatInfo = await seats.getSeat(seatId);
  const area = await areas.getInfo(seatInfo.location.areaId);
  const areaName = area.areaName;
  sendReportMail(seatId, { ...seatInfo, areaName });
  return res.status(204).end();
});

module.exports = bookingRouter;
