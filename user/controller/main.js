// find product by any keyword

/****   Utils  ****/
function getElement(selector) {
  return document.querySelector(selector);
}

function getElements(selector) {
  return document.querySelectorAll(selector);
}
//--find by Enter
getElement("#txtSearch").onkeypress = (event) => {
  if (event.key !== "Enter") {
    return;
  }
  apiGetProducts(event.target.value)
    .then((response) => {
      displayProduct(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  displaySearch();
};
//--find by onclick button
getElement("#basic-addon2").onclick = () => {
  let search = getElement("#txtSearch").value;
  apiGetProducts(search)
    .then((response) => {
      displayProduct(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  displaySearch();
};
//find by select
getElement("#mySelect").onclick = () => {
  let mySelect = getElement("#mySelect").value;

  apiGetProducts(mySelect)
    .then((response) => {
      displayProduct(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

//function display notication result search
function displaySearch() {
  if (getElement("#txtSearch").value.length > 0) {
    //display result search
    getElement(".reusultFind").style = "display:block";
    getElement(".reusultFind").innerHTML = `Kết quả tìm kiếm với : ${
      getElement("#txtSearch").value
    }`;
    //reset value
    getElement("#txtSearch").value = "";
  } else {
    getElement(".reusultFind").style = "display:none";
    displayProduct();
  }
}
