const Account = require("../models/account.model");
const Role = require("../models/role.model");



module.exports.auth = async(req, res, next) => {
  if(!req.cookies.token){
    req.flash("fail", "Please sign-in!")
    res.redirect("/admin/auth/login");
  }else{
    const user = await Account.findOne({deleted: false, token: req.cookies.token}).select("-password");
    if(!user){
      req.flash("fail", "Please sign-in!")
      res.redirect("/admin/auth/login");
    }else{
      res.locals.user = user;
      const user_role = await Role.findOne({deleted: false, _id: user.role_id}).select("permissions title");
      res.locals.user_role = user_role;
      next();
    }
  }
}