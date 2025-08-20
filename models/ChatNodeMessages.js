const mongoose = require("mongoose");

const ChatNodeMessagesSchema = new mongoose.Schema({
  node_id: { type: mongoose.Schema.Types.ObjectId, ref: "ChatNode" },
  message: String,
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ChatNodeMessages", ChatNodeMessagesSchema);
