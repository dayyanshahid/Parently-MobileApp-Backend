const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  auth_id: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // null if parent
  full_name: String,
  image: String,
  actionType: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
