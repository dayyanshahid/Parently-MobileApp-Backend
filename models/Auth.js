const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hash later with bcrypt
  code: String,
  codeTimeout: Date,
  fcmToken: String,
  actionType: String,
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Auth", AuthSchema);
