const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const verifyToken = async (req, reply, next) => {
  const authHeader = ctx.request.headers.token;
  if (!authHeader) return reply.code(403).send({ error: "Unauthenticated" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return reply.code(403).send({ error: "Invalid Token" });

    req.user = user.user;
    next();
  });
};

const verifyTokenAndAdmin = (req, reply, next) => {
  verifyToken(req, reply, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      reply.code(403).send({ error: "You dont have permission" });
    }
  });
};

module.exports = { createToken, verifyToken, verifyTokenAndAdmin };
