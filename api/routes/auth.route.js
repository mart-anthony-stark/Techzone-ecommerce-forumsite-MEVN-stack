const authController = require("../controllers/auth.controller");

const { verifyToken } = require("../utils/token");
const authRoutes = (fastify, options, done) => {
  fastify.get("/auth/logged", { preHandler: [verifyToken] }, (req, reply) => {
    reply.code(200).send({ message: "Authenticated" });
  });
  fastify.post("/auth/login", authController.login);
  fastify.post("/auth/register", authController.signup);
  done();
};

module.exports = authRoutes;
