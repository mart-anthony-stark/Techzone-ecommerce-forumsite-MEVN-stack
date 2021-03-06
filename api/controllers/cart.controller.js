const Cart = require("../models/Cart.model");

module.exports = {
  getAllCarts: async (req, reply) => {
    try {
      const carts = await Cart.find()
        .populate("userId")
        .populate("products.product");
      reply.code(200).send(carts);
    } catch (error) {
      reply.code(500).send({ error });
    }
  },
  getCartByUser: async (req, reply) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.uid })
        .populate("userId")
        .populate("products.product");
      cart.userId.password = undefined;
      reply.code(200).send(cart);
    } catch (error) {
      reply.code(500).send({ error });
    }
  },
  createCart: async (req, reply) => {
    try {
      const cart = await new Cart({
        userId: req.user._id,
        ...req.body,
      }).save();
      reply.code(200).send(cart);
    } catch (error) {
      reply.code(500).send({ error });
    }
  },
  updateCart: async (req, reply) => {
    if (req.body.userId) req.body.userId = undefined;
    try {
      const cart = await Cart.findOneAndUpdate(
        { userId: req.params.uid },
        {
          $set: req.body,
        },
        { new: true }
      );
      reply.code(200).send(cart);
    } catch (error) {
      reply.code(500).send({ error });
    }
  },
  deleteCart: async (req, reply) => {
    try {
      const cart = await Cart.findOneAndDelete({
        userId: req.params.uid,
      });
      reply.code(200).send(cart);
    } catch (error) {
      reply.code(500).send({ error });
    }
  },
};
