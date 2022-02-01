const cartController = require("../controllers/cart.controller");

const cartRoutes = (fastify, options, done) => {
  fastify.get("/carts", cartController.getAllCarts);
  done();
};
module.exports = cartRoutes;
