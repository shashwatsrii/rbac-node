const Role = require('../models/Role');

// @desc    Add a new role
// @route   POST /api/roles
// @access  Admin
const addRole = async (req, res) => {
  const { name, permissions } = req.body;

  try {
    // Check if role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ message: "Role already exists" });
    }

    // Create new role
    const role = await Role.create({ name, permissions });
    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    res.status(500).json({ message: "Failed to create role", error: error.message });
  }
};

// @desc    Update an existing role
// @route   PUT /api/roles/:id
// @access  Admin
const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, permissions } = req.body;

  try {
    // Find and update role
    const role = await Role.findByIdAndUpdate(id, { name, permissions }, { new: true });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: "Role updated successfully", role });
  } catch (error) {
    res.status(500).json({ message: "Failed to update role", error: error.message });
  }
};

module.exports = {
  addRole,
  updateRole
};
