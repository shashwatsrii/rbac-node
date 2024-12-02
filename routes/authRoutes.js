const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/auth/register
router.post('/register', registerUser);

// @route   POST /api/auth/login
router.post('/login', loginUser);

// @route   POST /api/auth/logout
router.post('/logout', protect, (req, res) => {
  // In JWT, logout is typically handled client-side by removing the token
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;

