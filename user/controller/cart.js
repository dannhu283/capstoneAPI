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
      alert("error");
    });
}

getProducts();

const productList = [];
// function display products on screen
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
    productList.push(product);
    return (
      result +
      `
        
      <div class="main_col col-lg-3 col-md-4 col-sm-6" >
        <div class="card">
          <div class="imgtheme">
            <img src="${product.img}"/>
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
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
          onclick="addToCart('${product.id}')">Add ➕</button>
        </div>
      </div>
      </div>
     
          `
    );
  }, "");
  list.innerHTML = html;
}

let cart = [];

// function add product to cart when user clicked button add
function addToCart(itemId) {
  const find = cart.find((value) => value.id === itemId);
  const findProduct = productList.find((value) => value.id === itemId);
  if (find === undefined) {
    const cartItem = {
      id: itemId,
      name: findProduct.name,
      price: findProduct.price,
      img: findProduct.img,
      quantity: 1,
    };
    //Add a new product to the cart when user clicked on the buy button add
    cart.push(cartItem);
  } else {
    //If there is already a product in the cart, increase the quantity of that product by 1, not add a new one
    find.quantity += 1;
  }
  //Hidden effect shows notification when adding product successfully
  getElement(".notication").style = "display:block";
  setTimeout(function () {
    getElement(".notication").style = "display:none";
  }, 1500);
  // change the quantity of products in the cart
  countQuantity(cart);
  // Display product in cart
  reload(cart);
  //save cart on localStorange
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Count product in cart
function countQuantity(cart) {
  const count = cart.reduce((result, value) => {
    return result + value.quantity;
  }, 0);
  quantity.innerHTML = count;
  if (count === 0) {
    quantity.innerHTML = "";
  }
  //save cart on localStorange
  localStorage.setItem("cart", JSON.stringify(cart));
}

function reload(product) {
  const html = product.reduce((result, value) => {
    let find = product.find((x) => x.id === value.id) || [];
    return (
      result +
      `
      <div class="bodyModal">
            <div><img class="modal_img" src="${value.img}"/></div>
            <div class="nameProduct">${value.name}</div>
       
        <div class="input">
            <button class="btn-quatity" onmousedown="decrease('${
              value.id
            }')">-</button>
            <div id="${value.id}" class="quantityProduct">${
        find.quantity === undefined ? 0 : find.quantity
      }</div>
            <button class="btn-quatity" onmousedown="increase('${
              value.id
            }')">+</button>
        </div>
        <div class="modal_price">$${value.price * find.quantity}</div>
        <button class="remove" onmousedown="removeProduct('${
          value.id
        }')">Xóa</button>
      </div>
      <hr>
        `
    );
  }, "");
  listCard.innerHTML = html;
  if (cart.length === 0) {
    quantity.innerHTML = "";
    //If there are no products in the cart,toggle the notification display and can't clicked the checkout button
    document.getElementById("btnCapNhat").disabled = true;
    getElement(".notice").style = "display:block";
  } else {
    document.getElementById("btnCapNhat").disabled = false;
    getElement(".notice").style = "display:none";
  }
  //recalculate the total amount every time the user changes the quantity
  totalProduct(cart);
}

//When the user clicks on any change button, it changes the quantity of that product
//-- increase Item
function increase(id) {
  let find = cart.find((value) => value.id === id);
  if (find.id === id) {
    find.quantity += 1;
  }
  changeQuantity(id);
  reload(cart);
  countQuantity(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}
//--decrease Item
function decrease(id) {
  let find = cart.find((value) => value.id === id);
  if (find.id === id) {
    find.quantity -= 1;
  }
  changeQuantity(id);
  deleteProduct(cart);
  countQuantity(cart);
  reload(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Delete item If quantity equal 0
function deleteProduct(carts) {
  cart = cart.filter((value) => {
    return value.quantity !== 0;
  });
}

// function change quantity if user click button in list
function changeQuantity(id) {
  let find = cart.find((value) => value.id === id);
  document.getElementById(id).innerHTML = +find.quantity;
}

// remove product from cart
function removeProduct(id) {
  cart = cart.filter((value) => value.id !== id);
  countQuantity(cart);
  reload(cart);
  cart;
  localStorage.setItem("cart", JSON.stringify(cart));
}

//total amount of all products in the cart
function totalProduct(cart) {
  if (cart.length === 0) {
    total.innerHTML = 0;
  } else {
    sum = cart.reduce((result, value) => {
      let find = cart.find((x) => x.id === value.id) || [];
      return result + find.quantity * find.price;
    }, 0);
    total.innerHTML = sum;
  }
}
saveCart();
//save cart for next visit if not already checkout
function saveCart() {
  cart = (JSON.parse(localStorage.getItem("cart")) || []).map((value) => {
    const cartItem = {
      id: value.id,
      name: value.name,
      price: +value.price,
      img: value.img,
      quantity: value.quantity,
    };
    return cartItem;
  });
  reload(cart);
  countQuantity(cart);
  //save cart on localStorange
  localStorage.setItem("cart", JSON.stringify(cart));
}

//function pay
function pay() {
  // after user clicked button payment,convert data back to the original
  cart = [];
  quantity.innerHTML = "";
  reload(cart);
  total.innerHTML = 0;
  //show cart message again and  you can't click the checkout button because cart is  clean
  getElement(".notice").style = "display:block";

  //save cart on localStorange
  localStorage.setItem("cart", JSON.stringify(cart));
}
