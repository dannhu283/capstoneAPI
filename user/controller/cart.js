/****   Utils  ****/
function getElement(selector) {
  return document.querySelector(selector);
}

function getElements(selector) {
  return document.querySelectorAll(selector);
}
//DOM
let list = getElement(".list");
let listCard = getElement(".listCard");
let body = getElement("body");
let total = getElement(".total");
let quantity = getElement(".quantity");

//call API
function getProducts() {
  apiGetProducts()
    .then((response) => {
      // display product
      displayProduct(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

getProducts();

// function display products on screen
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

    //change Json save on localStorange
    let productsJson = JSON.stringify(products);
    localStorage.setItem("productsJson", productsJson);

    return (
      result +
      `
    <div class="main_col col-lg-3 col-md-4 col-sm-6" >
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
          <h3>Dòng máy ${product.type} </h3>
          <li>Camera trước : ${product.frontCamera}</li>
          <li>Camera sau : ${product.backCamera}</li>
          <li>${product.desc}</li>
        </ul>
      </div>
      <div class="btn-add">
        <button 
        id="statusButton"
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
  list.innerHTML = html;
}

//change back object
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
//reload product in cart
function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, index) => {
    totalPrice = totalPrice + value.price * 1;
    count = count + value.quantity;
    if (value != null) {
      getElement(".notice").style = "display:none";
      //creat new div display products in cart
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

//function change quantity if user click add to cart
function changeQuantity(index, quantity) {
  if (quantity == 0) {
    delete listCards[index];
  } else {
    listCards[index].quantity = quantity;
    listCards[index].price = quantity * productsOb[index].price;
  }
  reloadCard();
}

//function pay
function pay() {
  if (confirm("Bạn có đồng ý thanh toán")) {
    listCard.innerHTML = "";
    listCards = [];
    quantity.innerHTML = "";
    total.innerHTML = 0;
    getElement(".notice").style = "display:block";
  }
}
