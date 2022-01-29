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
    ctx.status = 500;
    ctx.body = { msg: error };
  }
};

const signup = async (ctx) => {
  const { name, username, email, password } = ctx.request.body;
  try {
    const user = new User({
      name,
      username,
      email,
      password: password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    const token = createToken(user);
    user._doc.password = undefined;
    ctx.status = 200;
    ctx.body = { success: true, user: user._doc, token };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { msg: error };
  }
};

module.exports = { login, signup };
