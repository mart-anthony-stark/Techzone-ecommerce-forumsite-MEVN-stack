const cartController = require("../controllers/cart.controller");

const { verifyToken, verifyUID } = require("../utils/token");

const cartRoutes = (fastify, options, done) => {
  fastify.get(
    "/carts/:uid",
    { preHandler: [verifyToken, verifyUID] },
    cartController.getAllCarts
  );
  done();
};
module.exports = cartRoutes;
