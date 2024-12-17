const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const {
  validateSignUpData,
  validateSignInData,
} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { user_auth } = require("./midllewares/auth");

app.use(express.json());
app.use(cookieParser());

 
const authRouter=require("./routes/auth")
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/reuquests");
app.use("/",authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// above willl got to all routers to match the /link
//  after that it will get res 
// then it will get stop

app.use
connectDB()
  .then(() => {
    app.listen(7777, () => {
      console.log("server connected succesfully");
    });
    console.log("database connected");
  })
  .catch((err) => {
    console.error(err);
  });
