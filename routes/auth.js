const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../models/Auth");
const User = require("../models/User");

const router = express.Router();
const SECRET = "supersecret"; // ⚠️ put in env file later

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const auth = await Auth.create({
      email,
      password: hashed,
      isVerified: true
    });

    const user = await User.create({
      auth_id: auth._id,
      full_name,
      parent_id: null // means this is a parent
    });

    res.json({ auth, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const auth = await Auth.findOne({ email });

    if (!auth) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, auth.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ authId: auth._id }, SECRET, { expiresIn: "7d" });

    res.json({ token, authId: auth._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
