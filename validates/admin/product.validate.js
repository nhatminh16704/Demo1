module.exports.createProduct = (req, res, next) => {
  if(req.body.title == ""){
    req.flash('fail', 'Please enter title !!');
    res.redirect("back");
    return;
  }

  next();
}