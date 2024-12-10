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

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user=new User(req.body);
  // //  below function will return a promise
  try{await  user.save();
  res.send("user added successfully")}
  catch(err){
    res.status(404).send("error not found");
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
