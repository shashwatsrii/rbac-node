const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID from token, excluding password
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check roles
const checkRole = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      // Ensure user is authenticated
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      // Find user's role
      const userRole = await Role.findById(req.user.role);

      // Check if user's role matches required roles
      if (requiredRoles.includes(userRole.name)) {
        next();
      } else {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Role verification failed', error: error.message });
    }
  };
};

module.exports = { protect, checkRole };