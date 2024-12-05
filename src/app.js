const express = require('express');
const app=express(); 

  // res is necessary in qpp. use/get/post..... nhi to you will not get the answer from server
// app.use("/ddd",res1,res2,[res3,res4],res5);
  app.use("/user",(req,res,next)=>{
    console.log("pehla pehla res");
    // res.send("1st response");
    next();
    // above will call nect res if above res is not there 
    //  if res is there it will not work
    // but if res come now 
    res.send("1st late response");
    // above will give 2nd response late response
    // next paused late amessage 
    //  error bcs. after next one more res came; as request already fullfilled

  },
(req,res)=>{
    console.log("dusra dusra message");
    res.send("2nd respond");
})
app.listen(7777);