getProducts();

/****   Utils  ****/
function getElement(selector) {
  return document.querySelector(selector);
}

function getElements(selector) {
  return document.querySelectorAll(selector);
}
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
    <div class="col-3" >
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
        <button 
        class="button-37" 
        role="button" 
        onclick="AddToCard()">
        Add ➕ 
        </button>
      </div>
    </div>
    </div>
   
        `
    );
  }, "");
  document.getElementById("listProduct").innerHTML = html;
}

//add to card
cart = [];
let count = 0;
const AddToCart = [];
function AddToCard(productName) {
  count++;
  document.getElementById("quantity").innerHTML = count;
}

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
