const Account = require("../../models/account.model");
var md5 = require('md5');


//[GET] /admin/auth/login
module.exports.login = async(req, res) => {
  if(req.cookies.token){
    const user = Account.findOne({deleted: false, token: req.cookies.token});
    if(user){
      res.redirect("/admin/dashboard");
    }
  }

  res.render("admin/pages/auth/login", {
    pageTitle: "Login"
  })
};

//[POST] /admin/auth/login
module.exports.loginPost = async(req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await Account.findOne({
    deleted:false,
    email: email
  })

  
  if(!user){
    req.flash("fail", "Email not exist");
    res.redirect("back");
    return;
  }

  if(md5(password) != user.password){
    req.flash("fail", "Wrong password");
    res.redirect("back");
    return;
  }

  if(user.status == "inactive"){
    req.flash("fail", "Your account is locked");
    res.redirect("back");
    return;
  }

  res.cookie('token', user.token);
  res.redirect("/admin/dashboard");
  
};

//[GET] /admin/auth/logout
module.exports.logout = async(req, res) => {
  res.clearCookie('token');
  res.redirect("/admin/auth/login")
};


