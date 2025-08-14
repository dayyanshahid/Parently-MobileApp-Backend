const express = require('express');
const Event = require('../models/Event');
const Child = require('../models/Child');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all events for current parent's children
router.get('/', auth, async (req, res) => {
  try {
    const children = await Child.find({ parents: req.parent._id });
    const childIds = children.map(child => child._id);
    
    const events = await Event.find({ child: { $in: childIds } })
      .populate('child', 'firstName lastName')
      .populate('attendees', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email');
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new event
router.post('/', auth, async (req, res) => {
  try {
    const { child, ...eventData } = req.body;

    // Check if child exists and belongs to current parent
    const childDoc = await Child.findById(child);
    if (!childDoc) {
      return res.status(404).json({ message: 'Child not found' });
    }

    if (!childDoc.parents.includes(req.parent._id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const event = new Event({
      ...eventData,
      child,
      createdBy: req.parent._id
    });

    await event.save();

    // Add event to child's events array
    await Child.findByIdAndUpdate(
      child,
      { $push: { events: event._id } }
    );

    const populatedEvent = await Event.findById(event._id)
      .populate('child', 'firstName lastName')
      .populate('attendees', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email');

    res.status(201).json(populatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific event
router.get('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('child', 'firstName lastName')
      .populate('attendees', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if current parent has access to this event's child
    const child = await Child.findById(event.child);
    if (!child.parents.includes(req.parent._id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an event
router.put('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if current parent has access to this event's child
    const child = await Child.findById(event.child);
    if (!child.parents.includes(req.parent._id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )
    .populate('child', 'firstName lastName')
    .populate('attendees', 'firstName lastName email')
    .populate('createdBy', 'firstName lastName email');

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an event
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if current parent has access to this event's child
    const child = await Child.findById(event.child);
    if (!child.parents.includes(req.parent._id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Event.findByIdAndDelete(req.params.id);
    
    // Remove event from child's events array
    await Child.findByIdAndUpdate(
      event.child,
      { $pull: { events: req.params.id } }
    );

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
