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

//  we should take data from API only then update that data to database
// find jsobject nad json?
// adding a middleware to read all the json files
//  if no url given then this method will work on all url.
app.use(express.json());
app.use(cookieParser());
// reading data present in body of   request
//  find one will find first/older document (in case of many)documentation -> randomly)
//  read documentation
app.post("/signup", async (req, res) => {
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

//  login api
app.post("/login", async (req, res) => {
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

    // console.log(isValidPassword);
    if (isValidPassword) {
      //  will create JWT Token here
      //  add the token to cookie
      //  send the response bak to user
      // read about res.cookie documentation
      // const token = await jwt.sign({ _id: user._id }, "*MARIJ9-e-9ishq#", {
      //   expiresIn: "1d",
      // });
      // 1d,1h,
      const token=await user.getJWT();
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

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  console.log(userEmail);
  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("user not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//  to find all the people
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    if (user.length === 0) {
      res.status(404).send("user not found");
    }
    res.send(user);
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});
// to delete something
app.delete("/user", async (req, res) => {
  const userId1 = req.body.userId;
  console.log(userId1);
  try {
    // read documentation to see for syntax
    const user = await User.findByIdAndDelete({ _id: userId1 });
    res.send("deleted succesfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
// update data of the user
// it don't update the fields which are not avaialble in schema
//  no addn. of new fields
// options rea dit from documentation
// what u have given only that will change in the document

app.patch("/user/:userId", async (req, res) => {
  // const userId = req.body.userId;
  //  to fetch userId from url
  const userId = req.params?.userId;
  const data = req.body;
  //  u cant change ur some datas again
  // like email, gender,.. so put api level validation

  try {
    const ALLOWED_UPDATES = [
      "photourl",
      "about",
      "gender",
      "age",
      "skills",
      "userId",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) => {
      ALLOWED_UPDATES.includes(k);
    });
    if (!isUpdateAllowed) {
      throw new Error("updation not allowed of certain items");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
      // so that validators can run on update also.
    });
    res.send("user updated succesfully");
  } catch (err) {
    res.status(400).send("Update FAILED" + err.message);
  }
});

//  get the profile
app.get("/profile", user_auth, async (req, res) => {
  try {
    const user = req.user;
    console.log(`niche ${user.firstName} ka kundali hai`);
    console.log(user);
    res.send("aabra ka dabra");
  } catch (err) {
    res.status(400).send("Update FAILED" + err.message);
  }
});

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
