const systemConfig = require("../../config/system")
const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const roleRoute = require("./role.route");
const authorizeRoute = require("./authorize.route");
const accountRoute = require("./account.route");
const authRoute = require("./auth.route");
const authMiddleware = require("../../middlewares/auth.middleware");

module.exports = (app) => {
  app.use(systemConfig.prefixAdmin + "/product", authMiddleware.auth, productRoute);
  app.use(systemConfig.prefixAdmin + "/dashboard", authMiddleware.auth, dashboardRoute);
  app.use(systemConfig.prefixAdmin + "/category", authMiddleware.auth, categoryRoute);
  app.use(systemConfig.prefixAdmin + "/role", authMiddleware.auth, roleRoute);
  app.use(systemConfig.prefixAdmin + "/authorize", authMiddleware.auth, authorizeRoute);
  app.use(systemConfig.prefixAdmin + "/account", authMiddleware.auth, accountRoute);
  app.use(systemConfig.prefixAdmin + "/auth", authRoute);
} 