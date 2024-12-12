const mongoose = require("mongoose");
//  as mongoose will return promise
// we are exporting connectdb y?
// cause we want ap. listen to work after database connected
// big qn y?

//  cause bwfore first server started listening then databse connected 
//  because of asynchronousity so we have to wait 
//  that is a example of bad coding

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://goswamiraj2520:SRIpJ9pYficcpUYn@namastenode.wwp0s.mongodb.net/devTinder"
  );
};
module.exports=connectDB;
// connectDB()
//   .then(() => {
//     console.log("database connected");
//   })
//   .catch((err) => {
//     console.error("database connected succesfully");
//   });
