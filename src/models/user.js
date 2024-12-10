const mongoose =require("mongoose");
// first we will create schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  emailId: {
    type: String
  },
  password: {
    type: String
  },
  age: {
    type: Number
  },
  gender: {
    type: String
  }
});

//  second we will create mongoose model
//  name  of model and schema name
// name start with capital to reference a model
// above eg UserModel
// const UserModel=mongoose.model("user",userSchema); 
// module.exports=UserModel;
//  or simply write
module.exports = mongoose.model("user", userSchema);