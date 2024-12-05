//  starting point of application
// creating sever using express js.com
// first install express js via npm
//  node modules and package lock json came
//  
const express = require('express');
const app=express();
// server is responding , for all type of request
// /test is route-> will work for local host:/test
app.use("/test",(req,res)=>{
    res.send("hello from the server");
});
app.listen(3000,()=>{
    console.log('server is succesfully listenng on port 3000')
});
// it will wait fr you
// to stop again and again starting of server(node appp.js)
//  use nodemon
// add something on script to use on terminal
// "start":"node src/app.js",
// "dev":"nodemon src/app.js"
//  use npm run start/dev