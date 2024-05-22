const btnChangeStatus = document.querySelectorAll("[button-change-status]");
if(btnChangeStatus.length > 0){
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("path");
  btnChangeStatus.forEach(btn => {
    btn.addEventListener("click", () => {

      const id = btn.getAttribute("id");
      const status = btn.getAttribute("button-change-status");
      const action = path + `/${status}/${id}?_method=PATCH`;
      formChangeStatus.setAttribute("action", action);
      formChangeStatus.submit();

    })
  })
}