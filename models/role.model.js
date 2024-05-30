const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  title: String,
  description: { type: String, default: "" },
  permissions: {
    type: Array,
    default: []
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Tạo model từ schema đã định nghĩa
const Role = mongoose.model('Role', roleSchema, "role");

module.exports = Role;
 