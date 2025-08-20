const mongoose = require("mongoose");

const ChatNodeSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ChatNode", ChatNodeSchema);
