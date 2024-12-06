const express = require('express');
const app=express(); 

  // res is necessary in qpp. use/get/post..... nhi to you will not get the answer from server
// app.use("/ddd",res1,res2,[res3,res4],res5);
  app.get("/user",(req,res)=>{
    console.log("dusra dusra message");
    res.send("2nd respond");
})
app.listen(7777);
// between get and res function there are many functions existed and they are known as middleware
// example is authorization before giving the value of data to admin you first have to authorize him first 
// and this authorization is middleware here 
// in last git session functions with next() are middleware only
// bcs. they were coming between res and get funcrion 🤩
