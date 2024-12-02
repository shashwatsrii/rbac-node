const express = require('express');
const router = express.Router();
const { 
  getAllUsers, 
  getUserProfile,
  updateUserProfile 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

// @route   GET /api/users
router.get('/', 
  protect, 
  checkRole(['Admin']), 
  getAllUsers
);

// @route   GET /api/users/profile
router.get('/profile', 
  protect, 
  getUserProfile
);

// @route   PUT /api/users/profile
router.put('/profile', 
  protect, 
  updateUserProfile
);

module.exports = router;