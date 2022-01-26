const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

const login = async (ctx) => {
  const { username, email, password } = ctx.request.body;
  try {
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      ctx.status = 404;
      ctx.body = { msg: "Account not found" };
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      ctx.status = 401;
      ctx.body = { msg: "Incorrect password" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { msg: error };
  }
};

const signup = (ctx) => {
  const { name, username, email, password } = ctx.request.body;
  try {
  } catch (error) {
    ctx.status = 500;
    ctx.body = { msg: error };
  }
};

module.exports = { login, signup };
