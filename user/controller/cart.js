/****   Utils  ****/
function getElement(selector) {
  return document.querySelector(selector);
}

function getElements(selector) {
  return document.querySelectorAll(selector);
}

let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

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

getProducts();

function displayProduct(products) {
  let html = products.reduce((result, value, index) => {
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
    let productsJson = JSON.stringify(products);
    localStorage.setItem("productsJson", productsJson);

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
        onclick="addToCard(${index})">
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

let productStorangeJson = localStorage.getItem("productsJson");
let productsOb = JSON.parse(productStorangeJson);

let listCards = [];
function addToCard(index) {
  if (listCards[index] == null) {
    // copy product form list to list card
    listCards[index] = JSON.parse(JSON.stringify(productsOb[index]));
    listCards[index].quantity = 1;
  }
  reloadCard();
}

function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, index) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                  <div><img width="70%" src="${value.img}"/></div>
                  <div class="nameProduct">${value.name}</div>
                  <div class="priceProduct">${value.price}</div>
                  <div class="input">
                      <button onclick="changeQuantity(${index}, ${
        value.quantity - 1
      })">-</button>
                      <div class="count">${value.quantity}</div>
                      <button onclick="changeQuantity(${index}, ${
        value.quantity + 1
      })">+</button>
                  </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(index, quantity) {
  if (quantity == 0) {
    delete listCards[index];
  } else {
    listCards[index].quantity = quantity;
    listCards[index].price = quantity * productsOb[index].price;
  }
  reloadCard();
}
