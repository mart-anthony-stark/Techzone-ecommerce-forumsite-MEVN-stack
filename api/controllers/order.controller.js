const Order = require("../models/Order.model");

module.exports = {
  getAllOrders: async (req, reply) => {
    try {
      const orders = await Order.find({})
        .sort({ timestamp: "desc" })
        .populate("customer")
        .populate("products.productId");
      orders.forEach((order) => {
        order.customer.password = undefined;
      });
      reply.send(orders);
    } catch (error) {
      reply.code(500).send({ error });
    }
  },
  getUserOrders: async (req, reply) => {
    try {
      const orders = await Order.find({ customer: req.params.uid }).sort({
        timestamp: "desc",
      });
      reply.send(orders);
    } catch (error) {
      reply.code(500).send({ error });
    }
  },
  createOrder: async (req, reply) => {
    try {
      const order = await new Order({
        customer: req.user._id,
        ...req.body,
      }).save();
      reply.send(order);
    } catch (error) {
      reply.code(500).send({ error });
    }
  },
};
