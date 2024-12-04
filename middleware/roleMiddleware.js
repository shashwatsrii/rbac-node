const Role = require('../models/Role');

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


module.exports = { checkRole };