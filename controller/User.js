const bcrypt = require("bcrypt");
const { user, validate } = require("../model/User");

exports.signup = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error });
    }
    const User = await user.findOne({ email: req.body.email });
    if (User) {
      return res.status(409).send({ message: "email already used" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALTNUM));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await new user({ ...req.body, password: hashedPassword }).save();
    res.status(201).send({ message: "Created" });
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};
