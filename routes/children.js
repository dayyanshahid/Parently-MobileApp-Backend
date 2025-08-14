const express = require('express');
const Child = require('../models/Child');
const Parent = require('../models/Parent');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all children for current parent
router.get('/', auth, async (req, res) => {
  try {
    const children = await Child.find({ parents: req.parent._id })
      .populate('parents', 'firstName lastName email')
      .populate('events');
    
    res.json(children);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new child
router.post('/', auth, async (req, res) => {
  try {
    const childData = {
      ...req.body,
      parents: [req.parent._id]
    };

    const child = new Child(childData);
    await child.save();

    // Add child to parent's children array
    await Parent.findByIdAndUpdate(
      req.parent._id,
      { $push: { children: child._id } }
    );

    const populatedChild = await Child.findById(child._id)
      .populate('parents', 'firstName lastName email');
    
    res.status(201).json(populatedChild);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific child
router.get('/:id', auth, async (req, res) => {
  try {
    const child = await Child.findById(req.params.id)
      .populate('parents', 'firstName lastName email')
      .populate('events');
    
    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }

    // Check if current parent has access to this child
    if (!child.parents.includes(req.parent._id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(child);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a child
router.put('/:id', auth, async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);
    
    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }

    // Check if current parent has access to this child
    if (!child.parents.includes(req.parent._id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedChild = await Child.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('parents', 'firstName lastName email');

    res.json(updatedChild);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a child
router.delete('/:id', auth, async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);
    
    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }

    // Check if current parent has access to this child
    if (!child.parents.includes(req.parent._id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Child.findByIdAndDelete(req.params.id);
    
    // Remove child from parent's children array
    await Parent.findByIdAndUpdate(
      req.parent._id,
      { $pull: { children: req.params.id } }
    );

    res.json({ message: 'Child deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
