const Account = require("../models/account.model");



module.exports.auth = async(req, res, next) => {
  if(!req.cookies.token){
    req.flash("fail", "Please sign-in!")
    res.redirect("/admin/auth/login");
  }else{
    const user = await Account.findOne({deleted: false, token: req.cookies.token});
    if(!user){
      req.flash("fail", "Please sign-in!")
      res.redirect("/admin/auth/login");
    }else{
      next();
    }
  }
}