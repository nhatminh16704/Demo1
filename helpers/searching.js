module.exports = (req) => {
  let keyword = "";
  let regex;

  if(req.query.keyword){
    keyword = req.query.keyword;
    regex = new RegExp(keyword, 'i');
  }

  return {keyword, regex}

}