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
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Hàm in ra màn hình
function display(products) {
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
          <div class="d-flex">
            <button 
              class="btn btn-primary"
              onclick="selectProduct(${product.id})"
            >
              Chỉnh sửa
            </button>
            <button 
              class="btn btn-danger ml-2"
              onclick="deleteProduct(${product.id})"
            >
              Xoá
            </button>
          </div>
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
    <button class="btn btn-success" onclick="createProduct()">Thêm</button>
    <button class="btn btn-danger" data-dismiss="modal">Huỷ</button>
  `;
  addBlurEventListeners();
  addInputEventListeners();
};

// Hàm tạo product
function createProduct() {
  let product = validate();
  if (!product) {
    return;
  }
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
  resetForm();
  $("#myModal").modal("show");

  getElement(".modal-title").innerHTML = "Cập nhật sản phẩm";
  getElement(".modal-footer").innerHTML = `
    <button class="btn btn-success" onclick="updateProduct(${productId})">Cập nhật</button>
    <button class="btn btn-danger" data-dismiss="modal">Huỷ</button>
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
  addBlurEventListeners();
  addInputEventListeners();
}

// Hàm cập nhật sản phẩm
function updateProduct(productId) {
  // Khởi tạo object product
  let newProduct = validate();
  if (!newProduct) {
    return;
  }
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
getElement("#txtSearch").oninput = (event) => {
  if (event.target.value === "" || event.target.value) {
    apiGetProducts(event.target.value)
      .then((response) => {
        display(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
getElement("#txtSearch").onfocusout = (event) => {
  if (event.target.value === "" || event.target.value) {
    apiGetProducts(event.target.value)
      .then((response) => {
        display(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
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

  // Xóa thông báo lỗi
  let errorMessages = getElements(".sp-thongbao");
  errorMessages.forEach((message) => {
    message.innerHTML = "";
  });
}

// Hàm kiểm tra giá trị rỗng
function isRequired(value) {
  if (!value.trim()) {
    return false;
  }
  return true;
}

// Hàm kiểm tra thông tin của product có hợp lệ không
function validate() {
  let name = validateName();
  let price = validatePrice();
  let screen = validateScreen();
  let backCamera = validateBackCamera();
  let frontCamera = validateFrontCamera();
  let img = validateImg();
  let desc = validateDesc();
  let type = validateType();
  if (!name) {
    return undefined;
  }
  if (!price) {
    return undefined;
  }
  if (!screen) {
    return undefined;
  }
  if (!backCamera) {
    return undefined;
  }
  if (!frontCamera) {
    return undefined;
  }
  if (!img) {
    return undefined;
  }
  if (!desc) {
    return undefined;
  }
  if (!type) {
    return undefined;
  }

  let product = {
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
  };
  return product;
}

// Hàm kiểm tra tên sản phẩm
function isName(name) {
  const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return !specialChars.test(name);
}

function isNumeric(value) {
  return /^\d+$/.test(value);
}

function isURL(value) {
  // Kiểm tra định dạng URL hợp lệ
  return /^(ftp|http|https):\/\/[^ "]+$/.test(value);
}

// Hàm lắng nghe sự kiện blur để kiểm tra lại dữ liệu khi mất focus
function addBlurEventListeners() {
  getElement("#TenSP").addEventListener("blur", validateName);
  getElement("#GiaSP").addEventListener("blur", validatePrice);
  getElement("#ManHinhSp").addEventListener("blur", validateScreen);
  getElement("#BackCam").addEventListener("blur", validateBackCamera);
  getElement("#FrontCam").addEventListener("blur", validateFrontCamera);
  getElement("#HinhSP").addEventListener("blur", validateImg);
  getElement("#NoiDung").addEventListener("blur", validateDesc);
  getElement("#loaiSP").addEventListener("blur", validateType);
}

// Hàm lắng nghe sự kiện input để kiểm tra lại dữ liệu khi đang gõ
function addInputEventListeners() {
  getElement("#TenSP").addEventListener("input", validateName);
  getElement("#GiaSP").addEventListener("input", validatePrice);
  getElement("#ManHinhSp").addEventListener("input", validateScreen);
  getElement("#BackCam").addEventListener("input", validateBackCamera);
  getElement("#FrontCam").addEventListener("input", validateFrontCamera);
  getElement("#HinhSP").addEventListener("input", validateImg);
  getElement("#NoiDung").addEventListener("input", validateDesc);
  getElement("#loaiSP").addEventListener("input", validateType);
}
// validation
function validateName() {
  let name = getElement("#TenSP").value;
  let spanName = getElement("#tbTenSP");
  if (!isRequired(name)) {
    spanName.innerHTML = "Tên sản phẩm không được để trống";
    return false;
  } else if (!isName(name)) {
    spanName.innerHTML = "Tên sản phẩm không phù hợp";
    return false;
  } else {
    spanName.innerHTML = "";
  }
  return name;
}

function validatePrice() {
  let price = getElement("#GiaSP").value;
  let spanPrice = getElement("#tbGiaSP");
  if (!isRequired(price)) {
    spanPrice.innerHTML = "Giá tiền không được để trống";
    return false;
  } else if (!isNumeric(price)) {
    spanPrice.innerHTML = "Giá tiền phải là số";
    return false;
  } else {
    spanPrice.innerHTML = "";
  }
  getElement("#GiaSP").addEventListener("input", validatePrice);
  return price;
}

function validateScreen() {
  let screen = getElement("#ManHinhSp").value;
  let spanScreen = getElement("#tbManHinhSp");
  if (!isRequired(screen)) {
    spanScreen.innerHTML = "Màn hình không được để trống";
    return false;
  } else {
    spanScreen.innerHTML = "";
  }
  return screen;
}

function validateBackCamera() {
  let backCamera = getElement("#BackCam").value;
  let spanBackCamera = getElement("#tbBackCam");
  if (!isRequired(backCamera)) {
    spanBackCamera.innerHTML = "Thông số camera sau không được để trống";
    return false;
  } else {
    spanBackCamera.innerHTML = "";
  }
  return backCamera;
}

function validateFrontCamera() {
  let frontCamera = getElement("#FrontCam").value;
  let spanFrontCamera = getElement("#tbFrontCam");
  if (!isRequired(frontCamera)) {
    spanFrontCamera.innerHTML = "Thông số camera trước không được để trống";
    return false;
  } else {
    spanFrontCamera.innerHTML = "";
  }
  return frontCamera;
}

function validateImg() {
  let img = getElement("#HinhSP").value;
  let spanImg = getElement("#tbHinhSP");
  if (!isRequired(img)) {
    spanImg.innerHTML = "Hình ảnh không được để trống";
    return false;
  } else if (!isURL(img)) {
    spanImg.innerHTML = "Hình ảnh không hợp lệ";
    return false;
  } else {
    spanImg.innerHTML = "";
  }
  return img;
}

function validateDesc() {
  let desc = getElement("#NoiDung").value;
  let spanDesc = getElement("#tbNoiDung");
  if (!isRequired(desc)) {
    spanDesc.innerHTML = "Mô tả không được để trống";
    return false;
  } else {
    spanDesc.innerHTML = "";
  }
  return desc;
}

function validateType() {
  let type = getElement("#loaiSP").value;
  let spanType = getElement("#tbloaiSP");
  if (!isRequired(type)) {
    spanType.innerHTML = "Vui lòng chọn loại sản phẩm";
    return false;
  } else {
    spanType.innerHTML = "";
  }
  return type;
}
// Biến lưu trạng thái sắp xếp (mặc định là không sắp xếp)
let clickCount = 0;
// Hàm sắp xếp theo giá tiền
getElement("#sapXepGia").onclick = () => {
  apiGetProducts()
    .then((response) => {
      let product = response.data;
      if (clickCount === 2) {
        getElement(".selectUp").style.display = "inline-block";
        getElement(".selectDown").style.display = "inline-block";
        getElement(".selectInvisible").style.display = "none";
        display(product);
        clickCount = 0;
      } else {
        product.sort((a, b) => {
          if (clickCount === 0) {
            getElement(".selectUp").style.display = "none";
            return a.price - b.price;
          } else if (clickCount === 1) {
            getElement(".selectUp").style.display = "inline-block";
            getElement(".selectDown").style.display = "none";
            getElement(".selectInvisible").style.display = "inline-block";
            return b.price - a.price;
          }
        });
        display(product);
        clickCount++;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// Collapsed View
let isCollapse = false;
getElement("#collapsedView").onclick = () => {
  isCollapse = !isCollapse;
  const linkText = getElements(".nav-link-text");
  const navbarLabel = getElements(".navbar-vertical-label");
  const hrLabel = getElements(".hr-label");
  for (let val of linkText) {
    if (isCollapse) {
      val.style.display = "none";
    } else {
      val.style.display = "block";
    }
  }
  for (let val of navbarLabel) {
    if (isCollapse) {
      val.style.display = "none";
    } else {
      val.style.display = "block";
    }
  }
  for (let val of hrLabel) {
    if (isCollapse) {
      val.style.display = "block";
    } else {
      val.style.display = "none";
    }
  }
  if (isCollapse) {
    getElement("#navCollapse").style.width = "5rem";
    getElement(".navbar-vertical-footer-text").style.display = "none";
    getElement("#collapseRight").style.display = "inline-block";
    getElement("#collapseLeft").style.display = "none";
    getElement("#body").style.marginLeft = "5rem";
  } else {
    getElement("#navCollapse").style.width = "14rem";
    getElement(".navbar-vertical-footer-text").style.display = "inline-block";
    getElement("#collapseRight").style.display = "none";
    getElement("#collapseLeft").style.display = "inline-block";
    getElement("#body").style.marginLeft = "14rem";
  }
};
