//  here we will make signup, login,logout
const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const {
  validateSignUpData,
  validateSignInData,
} = require("../utils/validation");
const bcrypt = require("bcrypt");

// app.use()===router.use()
// everything is same here
// instead of app use authrouter

authRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  // //  below function will return a promise
  try {
    validateSignUpData(req);
    const {
      firstName,
      lastName,
      emailId,
      password,
      gender,
      age,
      photoUrl,
      about,
      skills,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      gender,
      age,
      photoUrl,
      about,
      skills,
    });
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(404).send(err + " fill required  datas properly");
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    validateSignInData(req);
    const { emailId, password } = req.body;
    // console.log(req.body);
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("something went wrong!!!! INVALID CREDENTIALS");
    }
    // console.log(user)
    const isValidPassword = await user.validatePassword(password);
    if (isValidPassword) {
      const token = await user.getJWT();
      console.log(token);
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("logged in succesfully");
    } else {
      throw new Error("something went wrong!!!! INVALID CREDENTIALS");
    }
  } catch (err) {
    res.status(404).send(err + " fill required  datas properly");
  }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token",null,{
        expires: new Date(Date.now()),
    })
    res.send("logged out successfully");
});
module.exports = authRouter;
