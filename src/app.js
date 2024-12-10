const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User=require("./models/user");

//  creating new instance of user model
// read about __v ...what's that?
app.post("/signup",async (req,res)=>{
  const userObj = {
    firstName: "Deepak",
    lastName: "Goswami",
    emailId: "goswaminishant9670@gmail.com",
    password: "aafat794613",
    age: 78,
    gender:"male"
  };
  const user=new User(userObj);
  //  below function will return a promise  
  try{await  user.save();
  res.send("user added successfully")}
  catch(err){
    res.status(404).send("error not found");
  }
  
})
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
