const Order = require("../models/Order.model");

module.exports = {
  getAllOrders: async (req, reply) => {
    try {
      const orders = await Order.find({}).sort({ timestamp: "desc" });
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
};
