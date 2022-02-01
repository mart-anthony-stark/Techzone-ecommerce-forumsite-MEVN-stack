const Cart = require("../models/Cart.model");

module.exports = {
  getAllCarts: async (req, reply) => {
    try {
      const carts = await Cart.find();
      reply.code(200).send(carts);
    } catch (error) {
      reply.code(500).send({ error });
    }
  },
  getCartByUser: async (req, reply) => {
    try {
      const cart = await Cart.find({ userId: req.params.uid });
      reply.code(200).send(cart);
    } catch (error) {
      reply.code(500).send({ error });
    }
  },
};
