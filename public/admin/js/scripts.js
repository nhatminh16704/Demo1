//Button status
const btnsStatus = document.querySelectorAll("[button-status]");
if(btnsStatus.length > 0){
  let url = new URL(window.location.href);

  btnsStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if(status){
        url.searchParams.set("mystatus", status);
      }else{
        url.searchParams.delete("mystatus");
      }

      window.location.href = url.href;
    })
  })

}

//Button status

//Form search

const formSearch = document.querySelector("#form-search");
if(formSearch){
  let url = new URL(window.location.href)

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.mykeyword.value;
    if(keyword){
      url.searchParams.set("keyword", keyword);
    }else{
      url.searchParams.delete("keyword");
    }
    window.location.href = url;
  })
}
//Form search

//Pagination
const btnPag = document.querySelectorAll("[button-pagination]");
let url = new URL(window.location.href)
if(btnPag.length > 0){
  btnPag.forEach(btn => {
    const page = btn.getAttribute("button-pagination");
    btn.addEventListener("click", () => {
      url.searchParams.set("page", page);
      window.location.href = url;
    })

  })
}


//End Pagination

//Change Multi
const checkboxMulti = document.querySelector("[checkbox-multi");
if(checkboxMulti){
  const checkAll = checkboxMulti.querySelector("input[name='checkall']");
  const checkIDS = checkboxMulti.querySelectorAll("input[name='id']");

  checkAll.addEventListener("click", () => {
    if(checkAll.checked){
      checkIDS.forEach(cb => {
        cb.checked = true;
      })
    }else{
      checkIDS.forEach(cb => {
        cb.checked = false;
      })
    }
  })

  checkIDS.forEach(cb => {
    cb.addEventListener("click", () => {
      const checkedN = checkboxMulti.querySelectorAll("input[name='id']:checked"); 
      if(checkedN.length == checkIDS.length){
        checkAll.checked = true;
      }else{
        checkAll.checked = false;
      }
    })
  })
}

const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const typeChange = e.target.elements.type.value;
    const checkedbox = checkboxMulti.querySelectorAll("input[name='id']:checked");

    if(typeChange == "delete"){
      const isConfirm = confirm("Delete these item ?");
      if(!isConfirm){
        return;
      }
    }


    if(checkedbox.length > 0){
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      const idChecked = [];
      checkedbox.forEach(box => {
        const id = box.value;
        if(typeChange == "position"){
          const pos = box.closest("tr").querySelector("input[name='position']").value;
          idChecked.push(`${id}-${pos}`);
        }else{
          idChecked.push(id);
        }
        
      })

      inputIds.value = idChecked.join(", ");
      console.log(idChecked);

      formChangeMulti.submit();
    }
    
    })
}
//End Change Multi

//Delete Item
const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete){

  const formDelete = document.querySelector("#form-delete-item");
  if(formDelete){
    const path = formDelete.getAttribute("path");

    buttonsDelete.forEach(btn => {
    btn.addEventListener("click", () => {
      const isConfirm = confirm("Delete this item");
      if(isConfirm){
        const id = btn.getAttribute("button-delete");
        const action = `${path}/${id}?_method=DELETE`;
        formDelete.action = action;
        formDelete.submit();
      }
      
    })
  })
  }
  
}


//End Delete Item

// Show alert 

const showAlert = document.querySelector("[show-alert]");
if(showAlert){
  const time = parseInt(showAlert.getAttribute("duration"));
  const closeAlert = showAlert.querySelector("[close-alert]");
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");   
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");   
  })
}
// End Show alert

//Preview image
const uploadImage = document.querySelector("[upload-image]");

if(uploadImage){
  const inputImage = uploadImage.querySelector("[upload-image-input");
  const previewImage = uploadImage.querySelector("[upload-preview-image");
  inputImage.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      previewImage.src = URL.createObjectURL(file)
    }
  })
}

//End Preview image

//Sort
const sort = document.querySelector("[sort]");
if(sort){
  const sortOption = sort.querySelector("[sort-select]");
  sortOption.addEventListener("change", (e) => {
    const url = new URL(window.location.href);

    const value = e.target.value;
    const [sortKey, sortValue] = value.split("-");

    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);

    window.location.href = url;
  })

  const sortClear = sort.querySelector("[sort-clear]");
  sortClear.addEventListener("click", () => {
    const url = new URL(window.location.href);

    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href = url;
  })

  const url = new URL(window.location.href);
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  if(sortKey && sortValue){
    const tmp = sortKey + "-" + sortValue;
    console.log(tmp);
    const optionSelected = sortOption.querySelector(`option[value='${tmp}']`);
    optionSelected.selected = true;
  }
}


//End Sort