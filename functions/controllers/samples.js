const express = require("express");
const samplesRouter = new express.Router();

const database = require("../models/models");

samplesRouter.get("/hello", async (req, res, next) => {
  const noErrors = true;
  if (noErrors) {
    await res.send("Hello World!");
  } else {
    // mocking middleware error handling
    next();
  }
});

samplesRouter.post("/database", async (req, res, next) => {
  const data = req.body;
  database.push_data(data);
  await res.send(`success adding ${data}`);
});

module.exports = samplesRouter;
