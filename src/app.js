const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
//  we should take data from API only then update that data to database
// find jsobject nad json?
// adding a middleware to read all the json files
//  if no url given then this method will work on all url.
app.use(express.json());

// reading data present in body of request
//  find one will find first/older document (in case of many)documentation -> randomly)
//  read documentation
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  // //  below function will return a promise
  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(404).send("error not found");
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
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("user updated succesfully");
  } catch (err) {
    res.status(400).send("something went wrong");
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
    console.error("database connected succesfully");
  });
