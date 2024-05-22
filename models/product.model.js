const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

// Định nghĩa schema cho tài liệu Product
const productSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, slug: "title", unique: true },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
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
const Product = mongoose.model('Product', productSchema, "product");

module.exports = Product;
 