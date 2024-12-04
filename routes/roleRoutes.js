const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/authMiddleware');
const { addRole, updateRole } = require('../controllers/roleController');

// Add a new role
router.post('/', protect, checkRole(['Admin']), addRole);

// Update an existing role
router.put('/:id', protect, checkRole(['Admin']), updateRole);

module.exports = router;
