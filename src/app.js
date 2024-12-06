const express = require("express");
const app = express(); 
const { admin_auth, user_auth } = require("./midllewares/auth_midllewares");
// res is necessary in qpp. use/get/post..... nhi to you will not get the answer from server
// app.use("/ddd",res1,res2,[res3,res4],res5);
// use bcs->get,post,put delete evrything
// we can use all also
// console.log(admin_auth);
app.get("/admin/getalldata", (req, res) => {
  // but before these things we have to authorize you
  res.send("ujfhdtyghujn")
});
app.delete("/admin/getalldata", (req, res) => {
  res.send("le bhai apna data maine delete kr diya");
});


app.get("/user/getalldata", user_auth, (req, res) => {
  // but before these things we have to authorize you
  res.send("user send data"); 
}); 

app.listen(7777);
// between get and res function there are many functions existed and they are known as middleware
// example is authorization before giving the value of data to admin you first have to authorize him first
// and this authorization is middleware here
// in last git session functions with next() are middleware only
// bcs. they were coming between res and get funcrion 🤩
