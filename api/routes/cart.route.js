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
  fastify.post(
    "/carts",
    { preHandler: [verifyToken] },
    cartController.createCart
  );
  fastify.put(
    "/carts/:uid",
    { preHandler: [verifyToken, verifyUID] },
    cartController.updateCart
  );
  done();
};
module.exports = cartRoutes;
