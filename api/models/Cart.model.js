const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
