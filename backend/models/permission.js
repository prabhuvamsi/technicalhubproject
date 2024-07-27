// models/Permission.js

const mongoose = require('mongoose');

// Define the schema for the Permission model
const permissionSchema = new mongoose.Schema({
  add: {
    type: Boolean,
    default: false
  },
  edit: {
    type: Boolean,
    default: false
  },
  delete: {
    type: Boolean,
    default: false
  }
});

// Create the Permission model from the schema
const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
