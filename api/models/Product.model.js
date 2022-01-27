const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    model: { type: String, required: true },
    category: {
      type: String,
      enum: ["phone", "laptop", "tablet", "accessories"],
    },
    photo: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    specs: { type: Array, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
