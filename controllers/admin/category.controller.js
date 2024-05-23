const Category = require("../../models/category.model");
const createTreeHelper = require("../../helpers/createTree");

//[GET] /admin/category
module.exports.category = async(req, res) => {
  const find = {
    deleted: false
  }

  const records = await Category.find(find);
  const newRecords = createTreeHelper.create(records, "");

  res.render("admin/pages/category", {
    pageTitle: "Category",
    records: newRecords
  })
};

//[GET] /admin/category/create
module.exports.create = async(req, res) => {
  const find = {
    deleted: false
  }

  const records = await Category.find(find);
  const newRecords = createTreeHelper.create(records, "");


  res.render("admin/pages/createCategory", {
    pageTitle: "Create Category",
    records: newRecords
  })
};

//[POST] /admin/category/create
module.exports.createPost = async(req, res) => {

  if(!req.body.position){
    const cnt = await Category.countDocuments();
    req.body.position = cnt + 1;
  }else{
    req.body.position = parseInt(req.body.position);    
  }

  const newCategory = new Category(req.body);
  await newCategory.save();

  res.redirect("/admin/category");
};

