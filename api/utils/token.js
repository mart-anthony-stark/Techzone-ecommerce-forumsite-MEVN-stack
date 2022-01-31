const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const verifyToken = (req, reply, next) => {
  const authHeader = req.headers.token;
  if (!authHeader) return reply.code(403).send({ error: "Unauthenticated" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return reply.code(403).send({ error: "Invalid Token" });

    req.user = user.user;
    next();
  });
};

const verifyUID = (req, reply, next) => {
  if (req.user._id === req.params.uid || req.user.role === "admin") next();
  else return reply.code(403).send({ error: "You don't have permission" });
};

const verifyAdmin = (req, reply, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    reply.code(403).send({ error: "You dont have permission" });
  }
};

module.exports = { createToken, verifyToken, verifyAdmin, verifyUID };
