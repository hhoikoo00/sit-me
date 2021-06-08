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

bookingRouter.delete("/:seatId", async (req, res, next) => {

});

module.exports = bookingRouter;
