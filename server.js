const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Role = require('./models/Role');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

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



app.get('/', (req, res) => {
  // Read the README.md file
  fs.readFile(path.join(__dirname, 'README.md'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading README.md file');
    }

    // Convert the Markdown content to HTML
    const htmlContent = marked(data);

    // Send the converted HTML as the response
    res.send(`
      <html>
        <head>
          <title>Welcome to the VRV Security RBAC System</title>
          <style>
            /* Basic styling for the page */
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            h1 {
              color: #2c3e50;
              font-size: 2.5em;
              margin-top: 20px;
              text-align: center;
            }
            h2 {
              color: #34495e;
              font-size: 2em;
              margin-top: 20px;
            }
            h3 {
              color: #16a085;
              font-size: 1.5em;
            }
            h4 {
              color: #1abc9c;
              font-size: 1.2em;
            }
            /* Styling for the Markdown content */
            div {
              max-width: 800px;
              margin: 20px auto;
              padding: 20px;
              background-color: white;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            /* Style links within Markdown content */
            a {
              color: #2980b9;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <h1>Welcome to the VRV Security RBAC System!</h1>
          <div>${htmlContent}</div>
        </body>
      </html>
    `);
  });
});


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/roles', require('./routes/roleRoutes'));

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