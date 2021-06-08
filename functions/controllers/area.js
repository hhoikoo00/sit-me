const express = require("express");
const areaRouter = new express.Router();
const { areas } = require("../models/models");

areaRouter.get("/", async (req, res, next) => {
  const areasInfo = await areas.getInfo();
  return res.json(areasInfo);
});

areaRouter.get("/detail/:areaId", async (req, res, next) => {
  const areaId = req.params.areaId;
  // Check if given params are valid
  if (areaId === undefined) {
    return next({ name: "InvalidParamsError", params: ["Area ID"] });
  }

  const areaDetail = await areas.getDetailedInfo(areaId);
  return res.json(areaDetail);
});

module.exports = areaRouter;
