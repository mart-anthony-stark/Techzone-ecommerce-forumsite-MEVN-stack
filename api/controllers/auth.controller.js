const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/token");

const login = async (req, reply) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user)
      return reply.code(404).send({ success: false, msg: "Account not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return reply
        .code(401)
        .send({ success: false, msg: "Incorrect password" });

    const token = createToken(user);
    user._doc.password = undefined;
    reply.code(200).send({ success: true, user: user._doc, token });
  } catch (error) {
    console.log(error);
    reply.code(500).send({ success: false, error });
  }
};

const signup = async (req, reply) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({
      username,
      email,
      password: password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    const token = createToken(user);
    user._doc.password = undefined;
    reply.code(200).send({ success: true, user: user._doc, token });
  } catch (error) {
    console.log(error);
    reply.code(500).send({ success: false, error });
  }
};

module.exports = { login, signup };
