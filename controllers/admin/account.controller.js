const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
var md5 = require('md5');


//[GET] /admin/account/index
module.exports.account = async(req, res) => {

  const records = await Account.find({deleted: false}).select("-password -token");
  for(const record of records){
    const role = await Role.findOne({_id: record.role_id, deleted: false});
    if(role){
      record.role_id = role.title;
    }
  }
  res.render("admin/pages/account/index", {records: records})
};

//[GET] /admin/account/create
module.exports.create = async(req, res) => {
  const roles = await Role.find({deleted: false});
  res.render("admin/pages/account/create", {roles: roles});
};

//[POST] /admin/account/create
module.exports.createPost = async(req, res) => {

  const existEmail = await Account.findOne({
    deleted: false,
    email: req.body.email
  })

  if(existEmail){
    req.flash("fail", `Email ${req.body.email} has existed`);
    res.redirect("back");
  }else{
    req.body.password = md5(req.body.password);
    const records = new Account(req.body);
    await records.save(); 
    res.render("admin/pages/account")
  }
  
};

//[GET] /admin/account/edit
module.exports.edit = async(req, res) => {
  const roles = await Role.find({deleted: false});
  const find = {
    deleted: false,
    _id: req.params.id
  }
  const record = await Account.findOne(find);
  res.render("admin/pages/account/edit", {
    roles: roles,
    record: record
  });
};

//[PATCH] /admin/account/edit/:id
module.exports.editPatch = async(req, res) => {

  const id = req.params.id;
  const existEmail = await Account.findOne({
    deleted: false,
    email: req.body.email,
    _id: {$ne: id}
  })

  if(existEmail){
    req.flash("fail", `Email ${req.body.email} has existed`);   
  }else{
    if(req.body.password){
      req.body.password = md5(req.body.password);
    }else{
      delete req.body.password
    }
    await Account.updateOne({_id: id}, req.body);
    req.flash("info", `Successfully Updating`);   
  }
  res.redirect("back");
  
};


