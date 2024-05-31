const systemConfig = require("../../config/system")
const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const roleRoute = require("./role.route");
const authorizeRoute = require("./authorize.route");

module.exports = (app) => {
  app.use(systemConfig.prefixAdmin, productRoute);
  app.use(systemConfig.prefixAdmin, dashboardRoute);
  app.use(systemConfig.prefixAdmin, categoryRoute);
  app.use(systemConfig.prefixAdmin, roleRoute);
  app.use(systemConfig.prefixAdmin, authorizeRoute);
} 