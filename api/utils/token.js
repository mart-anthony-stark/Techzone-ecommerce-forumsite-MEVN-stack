const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const verifyToken = async (ctx, next) => {
  const authHeader = ctx.request.headers.token;
  if (!authHeader) {
    ctx.status = 403;
    ctx.body = { error: "Unauthenticated" };
    return;
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      ctx.status = 403;
      ctx.body = { error: "Invalid token" };
      return;
    }

    ctx.user = user;
    await next();
  });
};

const verifyTokenAndAdmin = (ctx, next) => {
  verifyToken(ctx, async () => {
    if (ctx.user.role === "admin") {
      await next();
    } else {
      ctx.status = 403;
      ctx.body = { error: "You dont have permission" };
    }
  });
};

module.exports = { createToken, verifyToken, verifyTokenAndAdmin };
