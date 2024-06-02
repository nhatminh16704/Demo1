const mongoose = require('mongoose');
const generate = require('../helpers/generate');

const accountSchema = new mongoose.Schema({
  fullName: String,
  password: String,
  avatar: String,
  phone: String,
  email: String,
  status: String,
  role_id: String,
  token: {
    type: String,
    default: generate.generateRandomToken(20)
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Tạo model từ schema đã định nghĩa
const Account = mongoose.model('Account', accountSchema, "account");

module.exports = Account;
 