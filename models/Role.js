const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['User', 'Moderator', 'Admin']
  },
  permissions: [{
    type: String,
    required: true
  }]
}, { timestamps: true });

module.exports = mongoose.model('Role', RoleSchema);