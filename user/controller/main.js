// Hàm tìm kiếm sản phẩm

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
};

getElement("#basic-addon2").onclick = () => {
  let search = getElement("#txtSearch").value;
  apiGetProducts(search)
    .then((response) => {
      displayProduct(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
