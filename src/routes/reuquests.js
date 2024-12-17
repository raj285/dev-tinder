const express=require("express");
const requestRouter=express.Router();
const User = require("../models/user");
const { user_auth } = require("../midllewares/auth");

requestRouter.post("/sendConnectionRequest",user_auth, async (req,res)=>{
    const user =req.user;
    console.log("sending a connection request");
    res.send(user.firstName+" sent the connection request");
})
module.exports=requestRouter;