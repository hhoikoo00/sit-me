const express = require("express");
const bookingRouter = new express.Router();

// Maximum duration in minutes (to be defined in a config file)
// const MAX_DURATION = 180;

bookingRouter.post("/", async (req, res, next) => {
  const seatId = req.params.seatId;
  const userId = req.params.userId;
  const duration = req.params.duration;
  if (seatId === undefined || userId === undefined || duration === undefined) {
    return next({
      name: "InvalidParamsError",
      params: ["Seat ID", "User ID", "Duration"],
    });
  }
});

bookingRouter.delete("/:userId", async (req, res, next) => {
  const userId = req.params.userId;

  if (getUser(userId)) {
    const seatId = getSeatFromUser(userId);

    freeSeat(seatId);
    removeUser(userId);
  } else {
    return next({
      name: "WrongUserError",
      params: ["User ID"],
    });
  }

  res.status(204).end();
});


module.exports = bookingRouter;
