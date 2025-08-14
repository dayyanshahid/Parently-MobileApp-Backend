const jwt = require('jsonwebtoken');
const Parent = require('../models/Parent');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const parent = await Parent.findById(decoded.id).select('-password');
    
    if (!parent) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.parent = parent;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = auth;
