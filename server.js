const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Role = require('./models/Role');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Initial Role Seeding
const seedRoles = async () => {
  try {
    const roleCount = await Role.countDocuments();
    if (roleCount === 0) {
      await Role.create([
        { 
          name: 'User', 
          permissions: ['read:profile', 'update:profile'] 
        },
        { 
          name: 'Moderator', 
          permissions: ['read:profile', 'update:profile', 'manage:users'] 
        },
        { 
          name: 'Admin', 
          permissions: ['read:profile', 'update:profile', 'manage:users', 'manage:roles', 'full:access'] 
        }
      ]);
      console.log('Roles seeded successfully');
    }
  } catch (error) {
    console.error('Role seeding failed:', error);
  }
};

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Something broke!',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedRoles();
});