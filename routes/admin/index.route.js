const systemConfig = require("../../config/system")
const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");

module.exports = (app) => {
  app.use(systemConfig.prefixAdmin, productRoute);
  app.use(systemConfig.prefixAdmin, dashboardRoute);
} 