const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    role: { type: String, default: "user", enum: ["user", "admin"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
