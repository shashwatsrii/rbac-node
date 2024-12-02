const User = require('../models/User');

// @desc    Get all users (Admin only)
// @route   GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').populate('role');
    res.json(users);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching users', 
      error: error.message 
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('role');

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ 
        message: 'User not found' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching profile', 
      error: error.message 
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email
      });
    } else {
      res.status(404).json({ 
        message: 'User not found' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Profile update failed', 
      error: error.message 
    });
  }
};

module.exports = {
  getAllUsers,
  getUserProfile,
  updateUserProfile
};