const mongoose = require("mongoose");

const orderShema = new mongoose.Schema(
  {
    customer: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "shipped", "delivered"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderShema);
