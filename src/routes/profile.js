const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const { user_auth } = require("../midllewares/auth");
const { validateEditProfileData } = require("../utils/validation");

//  get the profile
profileRouter.get("/profile/view", user_auth, async (req, res) => {
  try {
    const user = req.user;
    console.log(`niche ${user.firstName} ka kundali hai`);
    console.log(user);
    res.send(user);
  } catch (err) {
    res.status(400).send("Update FAILED" + err.message);
  }
});

profileRouter.patch("/profile/edit", user_auth, async (req, res) => {
  try {
    // const user = req.user;
    if (!validateEditProfileData(req)) {
      throw new error("Invalid Edit request");
    }
    const user = req.user;
    console.log(user);
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
  } catch (err) {
    res.status(400).send("Update FAILED" + err.message);
  }
});
module.exports = profileRouter;
