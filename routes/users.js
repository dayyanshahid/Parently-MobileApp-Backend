const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Create child under parent
router.post("/create", async (req, res) => {
  try {
    const { auth_id, parent_id, full_name } = req.body;

    const child = await User.create({
      auth_id,
      parent_id,
      full_name
    });

    res.json(child);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get children of a parent
router.get("/children/:parentId", async (req, res) => {
  const children = await User.find({ parent_id: req.params.parentId });
  res.json(children);
});

module.exports = router;
