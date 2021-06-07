const express = require("express");
const loginRouter = new express.Router();
const authImperial = require("auth-imperial");

loginRouter.post("/", async (req, res, next) => {
  const shortcode = req.params.shortcode;
  const password = req.params.password;

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
