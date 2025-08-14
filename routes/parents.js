const express = require('express');
const Parent = require('../models/Parent');
const auth = require('../middleware/auth');

const router = express.Router();

// Get current parent profile
router.get('/profile', auth, async (req, res) => {
  try {
    const parent = await Parent.findById(req.parent._id)
      .populate('children')
      .populate('friends', 'firstName lastName email')
      .populate('familyTree.parent', 'firstName lastName email');
    
    res.json(parent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update parent profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Prevent password update through this route
    delete updates.email; // Prevent email update
    
    const parent = await Parent.findByIdAndUpdate(
      req.parent._id,
      { ...updates, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json(parent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all parents (for friend suggestions)
router.get('/', auth, async (req, res) => {
  try {
    const parents = await Parent.find({ _id: { $ne: req.parent._id } })
      .select('firstName lastName email')
      .limit(50);
    
    res.json(parents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
