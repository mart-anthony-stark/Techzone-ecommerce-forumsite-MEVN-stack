const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    comments: { type: Array, default: [] },
    liked: { type: Boolean, default: false },
    disliked: { type: Boolean, default: false },
    totalLikes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
