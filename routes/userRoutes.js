const express = require('express');
const router = express.Router();
const { 
  getAllUsers, 
  getUserProfile,
  updateUserProfile,
  updateUserStatus 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

// @route   GET /api/users
router.get('/', 
  protect, 
  checkRole(['Admin', 'Moderator']), 
  getAllUsers
);

// @route   GET /api/users/profile
router.get('/profile', 
  protect, 
  checkRole(['User', 'Moderator', 'Admin']),
  getUserProfile
);

// @route   PUT /api/users/profile
router.put('/profile', 
  protect, 
  checkRole(['User', 'Moderator', 'Admin']),
  updateUserProfile
);

router.patch('/:id/status',
  protect,
  checkRole(['Admin']),
  updateUserStatus
);

module.exports = router;