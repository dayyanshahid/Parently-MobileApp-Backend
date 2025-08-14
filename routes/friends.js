const express = require('express');
const Parent = require('../models/Parent');
const auth = require('../middleware/auth');

const router = express.Router();

// Send friend request
router.post('/request', auth, async (req, res) => {
  try {
    const { friendId } = req.body;
    
    // Check if friend exists
    const friend = await Parent.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: 'Parent not found' });
    }

    // Check if already friends
    const currentParent = await Parent.findById(req.parent._id);
    if (currentParent.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Already friends' });
    }

    // Add friend request (simplified - direct add for now)
    await Parent.findByIdAndUpdate(
      req.parent._id,
      { $addToSet: { friends: friendId } }
    );

    await Parent.findByIdAndUpdate(
      friendId,
      { $addToSet: { friends: req.parent._id } }
    );

    res.json({ message: 'Friend added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get friend list
router.get('/', auth, async (req, res) => {
  try {
    const parent = await Parent.findById(req.parent._id)
      .populate('friends', 'firstName lastName email profilePicture');
    
    res.json(parent.friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove friend
router.delete('/:id', auth, async (req, res) => {
  try {
    await Parent.findByIdAndUpdate(
      req.parent._id,
      { $pull: { friends: req.params.id } }
    );

    await Parent.findByIdAndUpdate(
      req.params.id,
      { $pull: { friends: req.parent._id } }
    );

    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
