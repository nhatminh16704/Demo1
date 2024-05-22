module.exports = (objPag, req, quantity) => {
  objPag.skip = (parseInt(req.query.page) - 1) * objPag.limit;
  objPag.current = parseInt(req.query.page);
  objPag.limitPage = Math.ceil(quantity / objPag.limit);

  return objPag;
}