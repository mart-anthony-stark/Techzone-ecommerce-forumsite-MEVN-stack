const orderController = require("../controllers/order.controller");

const { verifyToken, verifyAdmin, verifyUID } = require("../utils/token");
const orderRoutes = (fastify, options, done) => {
  fastify.get(
    "/orders",
    { preHandler: [verifyToken, verifyAdmin] },
    orderController.getAllOrders
  );
  fastify.get(
    "/orders/find/:uid",
    { preHandler: [verifyToken, verifyUID] },
    orderController.getUserOrders
  );
  fastify.post(
    "/orders",
    { preHandler: [verifyToken] },
    orderController.createOrder
  );
  done();
};

module.exports = orderRoutes;
