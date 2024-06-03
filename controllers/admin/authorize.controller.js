const Role = require("../../models/role.model");



//[GET] /admin/authorize/
module.exports.authorize = async(req, res) => {

  const records = await Role.find({deleted: false});

  res.render("admin/pages/authorize/index", {records: records})
};

//[PATCH] /admin/authorize/change
module.exports.change = async(req, res) => {
  const perm = JSON.parse(req.body.permissions);
  perm.forEach(async item => {
    await Role.updateOne({_id: item.id}, {permissions: item.permissions});
  });

  req.flash("info", "Successfully Updating");
  res.redirect("back");

};


