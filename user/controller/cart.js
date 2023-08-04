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
        class="button-37 statusButton" 
        role="button"
        onclick="addToCard(${index})">Add</button>
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

// firstly If you don't have a product in your cart, you can't click the checkout button
document.getElementById("btnCapNhat").disabled = true;

// function add product to cart when user clicked button add
function addToCard(index) {
  if (listCards[index] == null) {
    // copy product form list to list card
    listCards[index] = JSON.parse(JSON.stringify(productsOb[index]));
    listCards[index].quantity = 1;
    //Hidden effect shows notification when adding product successfully
    getElement(".notication").style = "display:block";
    setTimeout(function () {
      getElement(".notication").style = "display:none";
    }, 1500);
  } else {
    if (listCards[index]) {
      // If the product already exists in the cart, increase the quantity and price
      listCards[index].quantity++;
      listCards[index].price =
        listCards[index].quantity * productsOb[index].price;
      //Hidden effect shows notification when adding product successfully
      getElement(".notication").style = "display:block";
      setTimeout(function () {
        getElement(".notication").style = "display:none";
      }, 1500);
    }
  }

  reloadCard();
}

//reload product in cart
function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, index) => {
    count = count + value.quantity;
    totalPrice = totalPrice + value.price * 1;
    //If the value is greater than 0, then open the payment button
    if (totalPrice > 0) {
      document.getElementById("btnCapNhat").disabled = false;
    }
    if (value != null) {
      getElement(".notice").style = "display:none";
      //creat new div display products in cart
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                  <div><img width="70%" src="${value.img}"/></div>
                  <div class="nameProduct">${value.name}</div>
                  <div class="priceProduct">${value.price}</div>
                  <div class="input">
                      <button onmousedown="changeQuantity(${index}, ${
        value.quantity - 1
      })">-</button>
                      <div class="count">${value.quantity}</div>
                      <button onmousedown="changeQuantity(${index}, ${
        value.quantity + 1
      })">+</button>
                  </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
  //If there are no products in the cart, change the quantity to an empty string to display
  if (count <= 0) {
    quantity.innerText = "";
  }
}

//function change quantity if user click in list
function changeQuantity(index, quantity) {
  if (quantity == 0) {
    delete listCards[index];
    //If there are no products in the cart,toggle the notification display and can't click the checkout button
    document.getElementById("btnCapNhat").disabled = true;
    getElement(".notice").style = "display:block";
  } else {
    listCards[index].quantity = quantity * 1;
    listCards[index].price = quantity * productsOb[index].price;
  }
  reloadCard();
}

//function pay
function pay() {
  if (confirm("Bạn có đồng ý thanh toán")) {
    // after user clicked button payment,convert data back to the original
    listCard.innerHTML = "";
    listCards = [];
    quantity.innerHTML = "";
    total.innerHTML = 0;
    //show cart message again and  you can't click the checkout button because cart is
    getElement(".notice").style = "display:block";
    document.getElementById("btnCapNhat").disabled = true;
  }
}
