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

// //[GET] /admin/role/create
// module.exports.create = (req, res) => {
//   res.render("admin/pages/role/create")
// };

// //[POST] /admin/role/create
// module.exports.createPost = async(req, res) => {
//   console.log(req.body);
//   console.log("lolol");
//   const newCategory = new Role(req.body);
//   await newCategory.save();

//   res.redirect("/admin/role");
// };

// //[GET] /admin/role/edit/:id
// module.exports.edit = async(req, res) => {
//   try {
//     const id = req.params.id;
//     const find= {
//       deleted: false,
//       _id: id
//     }
//     const data = await Role.findOne(find);
//     res.render("admin/pages/role/edit", {data: data});

//   } catch (error) {
//     req.flash('fail', 'Errors occured');
//     res.redirect("back");
//   }
  
// };

// //[PATCH] /admin/role/edit/:id
// module.exports.editPatch = async(req, res) => {
//   try {
//     const id = req.params.id;
//     const find= {
//       deleted: false,
//       _id: id
//     }
//     await Role.updateOne(find, req.body);
//     req.flash('info', 'Successfully Updating');
//     res.redirect("back");
  
//   } catch (error) {
//     req.flash('fail', 'Errors occured');
//     res.redirect("back");
//   }
  
// };

