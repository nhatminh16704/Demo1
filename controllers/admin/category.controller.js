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


//[GET] /admin/category/detail
module.exports.detail = async(req, res) => {
  const find = {
    deleted: false,
    _id: req.params.id
  }

  const category = await Category.findOne(find);

  res.render("admin/pages/detailCategory", {
    pageTitle: "Detail Category",
    category: category
  })

  
};

//[GET] /admin/category/edit
module.exports.edit = async(req, res) => {
  const find = {
    deleted: "false",
    _id: req.params.id
  }

  try {
    const item = await Category.findOne(find);
    const records = await Category.find({deleted: false});
    const newRecords = createTreeHelper.create(records, "");

    res.render("admin/pages/editCategory", {
      category: item,
      records: newRecords
    });

  } catch (error) {
    req.flash('fail', 'An error occurred !!');
    res.redirect("/admin/category");
  }
  
}

//[PATCH] /admin/category/edit/:id
module.exports.editPost = async(req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position);
 
  try {
    await Category.updateOne({_id: id}, req.body);
    req.flash('info', 'Successfully Updating');
    res.redirect("back");
  } catch (error) {
    req.flash('fail', 'An error occurred !!');
    res.redirect("back")
  }


};
