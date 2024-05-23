const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

// Định nghĩa schema cho tài liệu Product
const categorySchema = new mongoose.Schema({
  title: String,
  parent_id:{
    type: String,
    default: ""
  },
  slug: { type: String, slug: "title"},
  description: String,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Tạo model từ schema đã định nghĩa
const Category = mongoose.model('Category', categorySchema, "category");

module.exports = Category;
 