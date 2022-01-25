const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    comments: { type: Array },
    liked: { type: Boolean },
    disliked: { type: Boolean },
    totalLikes: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
