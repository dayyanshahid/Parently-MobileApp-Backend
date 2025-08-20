const express = require("express");
const ChatNode = require("../models/ChatNode");
const ChatNodeDetails = require("../models/ChatNodeDetails");
const ChatNodeMessages = require("../models/ChatNodeMessages");

const router = express.Router();

// Create chat
router.post("/create", async (req, res) => {
  const { title, participants } = req.body;

  const chat = await ChatNode.create({});
  await ChatNodeDetails.create({
    chat_id: chat._id,
    title,
    participants
  });

  res.json({ chatId: chat._id });
});

// Send message
router.post("/message", async (req, res) => {
  const { node_id, sender, message } = req.body;

  const msg = await ChatNodeMessages.create({
    node_id,
    sender,
    message,
    status: "sent"
  });

  res.json(msg);
});

// Fetch messages
router.get("/messages/:nodeId", async (req, res) => {
  const msgs = await ChatNodeMessages.find({ node_id: req.params.nodeId })
    .populate("sender", "full_name")
    .sort({ createdAt: 1 });

  res.json(msgs);
});

module.exports = router;
