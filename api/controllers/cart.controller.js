const Cart = require("../models/Cart.model");

module.exports = {
  getAllCarts: async (req, reply) => {
    reply.send("carts");
  },
  getCartByUser: async (req, reply) => {
    reply.send(req.params.uid);
  },
};
