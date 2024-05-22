const Product = require("../../models/product.model");

module.exports.products = async(req, res) => {
  const product = await Product.find({deleted: false});
  product.forEach(item => {
    item.priceNew = (item.price * (1 - item.discountPercentage / 100)).toFixed(2);
  })
  res.render("clients/pages/products/index", {
    pageTitle: "Products Page",
    product: product
  });
};
module.exports.detailProduct = async(req, res) => {
  const slug = req.params.slug;
  const find = {
    deleted: false,
    slug: slug,
    status: "active"
  }

  const product = await Product.findOne(find);
  
  res.render("clients/pages/products/detailProduct", {
    pageTitle: "Detail Product",
    product: product
  });
};