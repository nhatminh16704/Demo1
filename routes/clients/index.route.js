const productsRoute = require("./products.route");
const homeRoute = require("./home.route");

module.exports = (app) => {
  
  app.use('/', homeRoute);
  app.use('/products', productsRoute);

}