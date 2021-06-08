const express = require("express");
const loginRouter = new express.Router();
const authImperial = require("auth-imperial");

loginRouter.post("/", async (req, res, next) => {
  const shortcode = req.body.shortcode;
  const password = req.body.password;
  // invalid params: no shortcode or password
  if (shortcode === undefined || password === undefined) {
    return next({ name: "MissingShortcodeOrPasswordError" });
  }

  const loggedIn = await authImperial(shortcode, password);

  if (loggedIn) {
    return res.json({ loggedIn, shortcode });
  } else {
    return next({ name: "LoginFailureError" });
  }
});

module.exports = loginRouter;
