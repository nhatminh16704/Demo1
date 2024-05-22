const Product = require("../../models/product.model.js")

module.exports.home = async (req, res) => {
  const product = await Product.find({});
  console.log(product);
  res.render("clients/pages/home/index", {
    pageTitle: "Home Page"
  });
};
