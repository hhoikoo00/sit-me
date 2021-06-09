const express = require("express");
const loginRouter = new express.Router();
const authImperial = require("auth-imperial");

const testAccounts = [
  {
    username: "demo1",
    password: "imperial",
  },
  {
    username: "demo2",
    password: "imperial",
  },
];

loginRouter.post("/", async (req, res, next) => {
  const shortcode = req.body.shortcode;
  const password = req.body.password;

  // Check if it matches testAccounts
  const testAccount = testAccounts
      .find((testAccount) => testAccount.username === shortcode);
  if (testAccount !== undefined) {
    return res.json({
      loggedIn: testAccount.password === password,
      userId: shortcode,
    });
  }

  // invalid params: no shortcode or password
  if (shortcode === undefined || password === undefined) {
    return next({
      name: "InvalidParamsError",
      params: ["shortcode", "password"],
    });
  }

  const loggedIn = await authImperial(shortcode, password);

  if (loggedIn) {
    return res.json({ loggedIn, shortcode });
  } else {
    return next({ name: "LoginFailureError" });
  }
});

module.exports = loginRouter;
