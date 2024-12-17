const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("name is not valid");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("NAME length should in between 4 and 50");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter strong password");
  }
};
const validateSignInData = (req) => {
  const { emailId, password } = req.body;
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields=["firstName","lastName","photoUrl","gender","age","about","skills"]
  Object.keys(req.body).every((field)=>allowedEditFields.includes(field));
  //  loop through all the keys of request body;
  
};
module.exports = {
  validateSignUpData,
  validateSignInData,
  validateEditProfileData,   
};
