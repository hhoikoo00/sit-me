const express = require("express");
const areaRouter = new express.Router();
const { areas } = require("../models/models");

areaRouter.get("/", async (req, res, next) => {
  const { areasInfo, error } = await areas.getInfo();

  if (areasInfo === null) {
    return next({ name: error });
  }

  return res.json(areasInfo);
});

areaRouter.get("/detail/:areaId", async (req, res, next) => {
  const areaId = req.params.areaId;
  // Check if given params are valid
  if (areaId === undefined) {
    return next({ name: "InvalidParamsError", params: ["Area ID"] });
  }

  const { areaDetail, error } = await areas.getDetailedInfo(areaId);
  if (areaDetail === null) {
    return next({ name: error });
  }

  return res.json(areaDetail);
});

module.exports = areaRouter;
