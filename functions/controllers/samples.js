const express = require("express");
const database = require("../models/models");
const samplesRouter = new express.Router();

// Get all seats (available or booked)
samplesRouter.get("/", async (req, res, next) => {
  const seats = await database.getAllSeats();
  res.json(seats);
});

// Get the seat with the <id>
samplesRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const seat = await database.getSeat(id);
  res.json(seat);
});

// Modify the booking status of the seat with the specific id
samplesRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const isBooked = req.body.isBooked;
  const data = await database.updateSeat(id, { isBooked });
  res.json(data);
});

module.exports = samplesRouter;
