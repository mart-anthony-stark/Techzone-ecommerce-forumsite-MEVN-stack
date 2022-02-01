const cartController = require("../controllers/cart.controller");

const { verifyToken, verifyUID, verifyAdmin } = require("../utils/token");

const cartRoutes = (fastify, options, done) => {
  fastify.get(
    "/carts",
    { preHandler: [verifyToken, verifyAdmin] },
    cartController.getAllCarts
  );
  fastify.get(
    "/carts/:uid",
    { preHandler: [verifyToken, verifyUID] },
    cartController.getCartByUser
  );
  done();
};
module.exports = cartRoutes;
