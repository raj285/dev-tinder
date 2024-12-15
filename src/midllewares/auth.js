const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const app = express();
const admin_auth = app.use("/admin", (req, res, next) => {
  const token = "xyz";
  const isautho = token === "xyz";
  console.log("auth is working ");
  if (!isautho) {
    res.status(401).send("not authorized");
  } else {
    next();
  }
});
const user_auth = async (req, res, next) => {
  try {
    //  read the token from request cookie
    const { token } = req.cookies;
    if(!token){
      throw new Error("Please login again");
    }
    const decodedMessage = await jwt.verify(token, "*MARIJ9-e-9ishq#");
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Please login again");
    }
    // attaching data of user to request;
    //  so next middleware function can use it
    req.user=user;  
    next();
    //  validate the token
    //  find the user
  } catch (err) {
    res.status(400).send("something went wrong " + err.message);
  }
};
module.exports = {
  admin_auth,
  user_auth,
};
