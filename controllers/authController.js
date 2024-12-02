const User = require('../models/User');
const Role = require('../models/Role');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  const { username, email, password, roleName } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (userExists) {
      return res.status(400).json({ 
        message: 'User already exists' 
      });
    }

    // Find default role (if not specified, default to 'User')
    const role = await Role.findOne({ 
      name: roleName || 'User' 
    });

    if (!role) {
      return res.status(400).json({ 
        message: 'Invalid role specified' 
      });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      role: role._id
    });

    // Generate token
    const token = generateToken(user._id, role._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: role.name,
      token
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Registration failed', 
      error: error.message 
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email }).populate('role');

    if (user && (await user.matchPassword(password))) {
      // Generate token
      const token = generateToken(user._id, user.role._id);

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role.name,
        token
      });
    } else {
      res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Login failed', 
      error: error.message 
    });
  }
};

module.exports = {
  registerUser,
  loginUser
};