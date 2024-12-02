const jwt = require('jsonwebtoken');

const generateToken = (userId, roleId) => {
  return jwt.sign(
    { 
      id: userId, 
      role: roleId 
    }, 
    process.env.JWT_SECRET, 
    { 
      expiresIn: process.env.JWT_EXPIRES_IN 
    }
  );
};

module.exports = generateToken;