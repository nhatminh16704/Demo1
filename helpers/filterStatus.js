module.exports = (req) => {
  const filterStatus = [
    {
      name: "All",
      status: "",
      class: ""
    },
  
    {
      name: "Active",
      status: "active",
      class: ""
    },
  
    {
      name: "Inactive",
      status: "inactive",
      class: ""
    } 
  ]
  
  if(req.query.mystatus){
    const idx = filterStatus.findIndex(item => item.status == req.query.mystatus);
    filterStatus[idx].class = "active";
  }else{
    filterStatus[0].class = "active";
  }
  
  return filterStatus;
}