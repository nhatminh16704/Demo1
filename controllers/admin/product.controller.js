//[GET] /admin/product
const Product = require("../../models/product.model");
const filter_Status = require("../../helpers/filterStatus")
const searching =  require("../../helpers/searching")
const pagination_helper =  require("../../helpers/pagination")
const createTreeHelper = require("../../helpers/createTree");
const Category = require("../../models/category.model");
const { category } = require("./category.controller");


module.exports.product = async (req, res) => {
  
  let find = {
    deleted: false,
  }

  
  let objPag = {
    limit: 4,
    current: 1
  }

  const quantity = await Product.countDocuments(find);
  objPag = pagination_helper(objPag, req, quantity)
  
  
  const fs = filter_Status(req);
  const objS = searching(req);

  
  if(req.query.mystatus){
    find.status = req.query.mystatus;
  }
  if(req.query.keyword){
    find.title = objS.regex;
  }

  const sort = {};
  if(req.query.sortKey && req.query.sortValue){
    console.log(req.query);
    sort[req.query.sortKey] = req.query.sortValue;
  }else{
    sort.position = "desc";
  }

  const products = await Product.find(find).limit(objPag.limit).skip(objPag.skip).sort(sort);

  res.render("admin/pages/product", {
    products: products,
    filterStatus: fs,
    keyword: objS.keyword,
    limitPage: objPag.limit,
    currentPage: objPag.current
  })
};

module.exports.changeStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  await Product.updateOne({_id: id}, {status: status});

  req.flash('info', 'Successfully Updating !!');
  
  res.redirect("back");
}

module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({_id: id}, {deleted: true});

  res.redirect("back");
}

module.exports.changeMulti = async (req, res) => {
  
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch(type){
    case "active": 
      await Product.updateMany({_id: {$in: ids}}, {status: "active"});
      break;
    case "inactive":
      await Product.updateMany({_id: {$in: ids}}, {status: "inactive"});
      break;
    case "delete":
      await Product.updateMany({_id: {$in: ids}}, {
        deleted: true,
        deleteAt: new Date()
      });
      break;
    case "position":
      for (const iterator of ids) {
        const [id, pos] = iterator.split("-");
        await Product.updateOne({_id: id}, {position: pos});       
      }
      break;
    
    default:
      break;
  }

  
  res.redirect("back");
}

module.exports.createItem = async(req, res) => {
  const records = await Category.find({deleted: false});
  const newRecords = createTreeHelper.create(records, "");
  res.render("admin/pages/createProduct", {category: newRecords});

}

module.exports.createProduct = async(req, res) => {
  
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if(req.body.position == ""){
    const cnt = await Product.countDocuments();
    req.body.position = cnt + 1;
  }else{
    req.body.position = parseInt(req.body.position);    
  }

  const newProduct = new Product(req.body);
  await newProduct.save();

  res.redirect("/admin/product");


}

module.exports.editItem = async(req, res) => {
  const find = {
    deleted: "false",
    _id: req.params.id
  }

  const records = await Category.find({deleted: false});
  const newRecords = createTreeHelper.create(records, "");
  try {
    const item = await Product.findOne(find);
    res.render("admin/pages/editProduct", {product: item, category: newRecords});

  } catch (error) {
    req.flash('fail', 'An error occurred !!');
    res.redirect("/admin/product");
  }
  
}
module.exports.editProduct = async(req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  try {
    await Product.updateOne({_id: id}, req.body);
    req.flash('info', 'Successfully Updating');
    res.redirect("back");
  } catch (error) {
    req.flash('fail', 'An error occurred !!');
    res.redirect("back")
  }
}

module.exports.detailItem = async(req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({_id: id});
  console.log(product);
  res.render("admin/pages/detailProduct", {product: product});
}