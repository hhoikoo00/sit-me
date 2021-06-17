const express = require("express");
const utilRouter = new express.Router();
const { seats } = require("../models/models");

utilRouter.post("/", async (req, res, next) => {
  await seats.generateNewCodes();
  return res.json({ success: true });
});

module.exports = utilRouter;
