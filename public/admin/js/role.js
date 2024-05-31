const tablePermission = document.querySelector("[table-permission]");
if(tablePermission){
  const btnSubmit = document.querySelector("[button-submit]");
  btnSubmit.addEventListener("click", () => {
    const authorization = [];
    const rows = tablePermission.querySelectorAll("[data-name]");
    rows.forEach(row => {
      const inp = row.querySelectorAll('input');
      const name = row.getAttribute("data-name");
      if(name == "id"){
        inp.forEach(input => {
          authorization.push({
            id: input.value,
            permissions: []
          })
        })
      }else{
        inp.forEach((input, index) => {
          const checked = input.checked;
          if(checked){
            authorization[index].permissions.push(name);
          }
        })
      }
    })
    if(authorization.length > 0){
      const formchange = document.querySelector("#form-change-permissions");
      const input = formchange.querySelector('input');
      input.value= JSON.stringify(authorization);
      formchange.submit();
    }
})
  
}

//Permission default
const dataRecords = document.querySelector("[data-records");
if(dataRecords){
  const perm = JSON.parse(dataRecords.getAttribute("data-records"));
  console.log(perm);
  perm.forEach((item, index) => {
    item.permissions.forEach(per => {
      const row = tablePermission.querySelector(`[data-name='${per}']`)
      const inp = row.querySelectorAll("input");
      inp[index].checked = true;
    })
  })
}

//End permission default