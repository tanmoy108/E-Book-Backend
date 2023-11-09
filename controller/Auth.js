const bcrypt = require("bcrypt");
const { user } = require("../model/User");
const joi = require("joi")


exports.login = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: "not validate",error });
    }
    const User = await user.findOne({ email: req.body.email });
    if (!User) {
      return res.status(401).send({ message: "invalid email or password" });
    }
    const validPassword = await bcrypt.compare(req.body.password, User.password);
    if (!validPassword) {
      return res.status(401).send({ message: "invalid email or password" });
    }
    const token = User.generateAuthToken();
    return res.status(201).send({ data: token, message: "Login Successfully" });
  } catch (error) {
    return res.status(400).send({ message: "errors: "+error });
  }
};

const validate = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: joi.string().required().label("Password"),
  });

  return schema.validate(data);
};