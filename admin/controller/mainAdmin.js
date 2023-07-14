getProducts();

/****   Utils  ****/
function getElement(selector) {
  return document.querySelector(selector);
}

// Hàm gọi API xuất ra màn hình
function getProducts() {
  apiGetProducts()
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Hàm in ra màn hình
function display(products) {
  html = products.reduce((result, value, index) => {
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
      <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.screen}</td>
        <td>${product.backCamera}</td>
        <td>${product.frontCamera}</td>
        <td>
        <img
        src="${product.img}"
        width="100px"
        height="100px"
        alt=""
      />
        </td>
        <td>${product.desc}</td>
        <td>${product.type}</td>
        <td>
          <button 
          class = "btn btn-primary"
          onclick= "selectProduct(${product.id})"
          >Xem</button>
          <button 
          class = "btn btn-danger mt-2"
          onclick ="deleteProduct(${product.id})"
          >Xoá</button>
        </td>
      </tr>
      `
    );
  }, "");
  document.getElementById("tblDanhSachSP").innerHTML = html;
}

getElement("#btnThemSP").onclick = () => {
  resetForm();
  getElement(".modal-title").innerHTML = "Thêm sản phẩm";
  getElement(".modal-footer").innerHTML = `
  <button class ="btn btn-success" onclick="createProduct()">Thêm</button>
  <button class ="btn btn-danger" data-dismiss="modal">Huỷ</button>
  `;
};

// Hàm tạo product
function createProduct() {
  // Khởi tạo object product
  let product = {
    name: getElement("#TenSP").value,
    price: +getElement("#GiaSP").value,
    screen: getElement("#ManHinhSp").value,
    backCamera: getElement("#BackCam").value,
    frontCamera: getElement("#FrontCam").value,
    img: getElement("#HinhSP").value,
    desc: getElement("#NoiDung").value,
    type: getElement("#loaiSP").value,
  };

  // Gọi API thêm sản phẩm
  apiCreateProduct(product)
    .then(() => {
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);
      // Ẩn modal
      $("#myModal").modal("hide");
    })
    .catch((error) => {
      console.log(error);
    });
  resetForm();
}

// Hàm xoá product
function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then(() => {
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Hàm xem sản phẩm
function selectProduct(productId) {
  $("#myModal").modal("show");

  getElement(".modal-title").innerHTML = "Cập nhật sản phẩm";
  getElement(".modal-footer").innerHTML = `
  <button class ="btn btn-success" onclick="updateProduct(${productId})">Cập nhật</button>
  <button class ="btn btn-danger" data-dismiss="modal">Huỷ</button>
  `;

  apiGetProductById(productId)
    .then((response) => {
      let product = response.data;
      getElement("#TenSP").value = product.name;
      getElement("#GiaSP").value = product.price;
      getElement("#ManHinhSp").value = product.screen;
      getElement("#BackCam").value = product.backCamera;
      getElement("#FrontCam").value = product.frontCamera;
      getElement("#HinhSP").value = product.img;
      getElement("#NoiDung").value = product.desc;
      getElement("#loaiSP").value = product.type;
    })
    .catch((error) => {
      console.log(error);
    });
}

// Hàm cập nhật sản phẩm
function updateProduct(productId) {
  // Khởi tạo object product
  let newProduct = {
    name: getElement("#TenSP").value,
    price: +getElement("#GiaSP").value,
    screen: getElement("#ManHinhSp").value,
    backCamera: getElement("#BackCam").value,
    frontCamera: getElement("#FrontCam").value,
    img: getElement("#HinhSP").value,
    desc: getElement("#NoiDung").value,
    type: getElement("#loaiSP").value,
  };
  apiUpdateProduct(productId, newProduct)
    .then(() => {
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  $("#myModal").modal("hide");
  resetForm();
}

// Hàm tìm kiếm
getElement("#txtSearch").onkeypress = (event) => {
  if (event.key !== "Enter") {
    return;
  }
  apiGetProducts(event.target.value)
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

getElement("#basic-addon2").onclick = () => {
  let search = getElement("#txtSearch").value;
  apiGetProducts(search)
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
// Hàm resetForm
function resetForm() {
  getElement("#TenSP").value = "";
  getElement("#GiaSP").value = "";
  getElement("#ManHinhSp").value = "";
  getElement("#BackCam").value = "";
  getElement("#FrontCam").value = "";
  getElement("#HinhSP").value = "";
  getElement("#NoiDung").value = "";
  getElement("#loaiSP").value = "";
}

// Hàm kiểm tra giá trị rỗng
function isRequired(value) {
  if (!value.trim()) {
    return false;
  }
  return true;
}

// validation
