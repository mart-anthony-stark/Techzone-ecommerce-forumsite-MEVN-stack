const orderController = require("../controllers/order.controller");

const { verifyToken, verifyAdmin } = require("../utils/token");
const orderRoutes = (fastify, options, done) => {
  fastify.get(
    "/orders",
    { preHandler: [verifyToken, verifyAdmin] },
    orderController.getAllOrders
  );
  done();
};

module.exports = orderRoutes;
