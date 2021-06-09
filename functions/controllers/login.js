const express = require("express");
const loginRouter = new express.Router();
const authImperial = require("auth-imperial");

const testAccounts = [
  {
    username: "demo1",
    password: "imperialDRP1",
  },
  {
    username: "demo2",
    password: "imperialDRP2",
  },
];

loginRouter.post("/", async (req, res, next) => {
  const shortcode = req.body.shortcode;
  const password = req.body.password;

  // Check if it matches testAccounts
  const testAccount = testAccounts.filter((testAccount) =>
    testAccount.username === shortcode);
  const isPasswordCorrect = testAccount.password === password;

  if (testAccount !== null) {
    return res.json({ isPasswordCorrect, shortcode });
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
