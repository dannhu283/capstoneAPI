getProducts();
// Hàm gọi API xuất ra màn hình
function getProducts() {
  apiGetProducts()
    .then((response) => {
      // hiện sản phẩm ra giao diện
      displayProduct(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
// hàm hiện sản phẩm
function displayProduct(products) {
  let html = products.reduce((result, value) => {
    let product = new Product(
      value.id,
      value.name,
      value.price,
      value.screen,
      value.backCamera,
      value.frontCamera,
      value.img,
      value.desc,
      value.type
    );

    return (
      result +
      `
    <div class="col-4">
      <div class="card">
        <div class="imgtheme">
          <img src="${product.img}"/>
          <h3>${product.name}</h3>
          <p> ${product.price}</p>
        </div>
       
        
      </div>
      <div class="over_lay">
      <div class="over_infor">
        <ul>
          <h3>Dòng máy :${product.type} </h3>
          <li>Camera trước : ${product.frontCamera}</li>
          <li>Camera sau : ${product.backCamera}</li>
          <li>${value.desc}</li>
        </ul>
      </div>
      <div class="btn-add">
        <button class="button-37" role="button">Add ➕</button>
      </div>
    </div>
    </div>
   
        `
    );
  }, "");
  document.getElementById("listProduct").innerHTML = html;
}
