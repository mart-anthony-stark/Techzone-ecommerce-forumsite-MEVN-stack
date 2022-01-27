const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const verifyToken = (ctx, next) => {
  const authHeader = ctx.request.headers.token;
  if (!authHeader) {
    ctx.status = 403;
    ctx.body = { error: "Unauthenticated" };
    return;
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      ctx.status = 403;
      ctx.body = { error: "Invalid token" };
      return;
    }

    req.user = user;
    await next();
  });
};

const verifyTokenAndAuth = (ctx, next) => {
  
}

module.exports = { createToken };
