const mongoose = require("mongoose");
const { Schema } = mongoose;
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken")

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: {type:String, require:true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

//token generate
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const validate = (data) => {
  const schema = joi.object({
    firstName: joi.string().required().label("First Name"),
    lastName: joi.string().required().label("Last Name"),
    phone: joi.string().required().label("Phone"),
    email: joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });

  return schema.validate(data);
};

const user = mongoose.model("user", UserSchema);

module.exports = { user, validate };
