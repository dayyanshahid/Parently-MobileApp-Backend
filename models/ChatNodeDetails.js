const mongoose = require("mongoose");

const ChatNodeDetailsSchema = new mongoose.Schema({
  chat_id: { type: mongoose.Schema.Types.ObjectId, ref: "ChatNode" },
  title: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("ChatNodeDetails", ChatNodeDetailsSchema);
