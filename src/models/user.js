const mongoose = require("mongoose");
// first we will create schema
const validator =require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      //  needed first name compulsary to fill
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      //  no 2 mail ids
      lowerCase: true,
      trim: true,
      //  no extra space
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address:" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("weak password " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender data is not valid");
        }
      },
      // will work only during creation not updation
      //  in patch option.run validators include it -> then it will work
      //
    },
    photoUrl: {
      type: String,
      default: "https://i.postimg.cc/ZnwddT17/Screenshot-121.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid url:" + value);
        }
      },
    },
    about: {
      type: String,
      default: "this is a defualt text if not added anything",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true } // when this data was created and updated
);

//  second we will create mongoose model
//  name  of model and schema name
// name start with capital to reference a model
// above eg UserModel
// const UserModel=mongoose.model("user",userSchema);
// module.exports=UserModel;
//  or simply write

userSchema.methods.getJWT=async function(){ 
  const user= this;
  const token = await JsonWebTokenError.sign(
    { _id: user._id },
    "*MARIJ9-e-9ishq#",
    {expiresIn:"7d",}
  );
  return token;
}
//  dont use arrow function with this keyword


userSchema.methods.validatePassword= async function(passwordInputByUser){
  const user= this;
  const passwordHash=user.password;
  const isValidPassword= await bcrypt.compare(passwordInputByUser,passwordHash);
  return isValidPassword;
}
module.exports = mongoose.model("user", userSchema);
