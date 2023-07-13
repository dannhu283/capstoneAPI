function apiGetProducts(searchValue) {
  return axios({
    url: `https://https://64a6ad13096b3f0fcc8042b9.mockapi.io/productPhone`,
    method: "GET",
    params: {
      name: searchValue || undefined,
    },
  });
}

function apiGetProductById(productId) {
  return axios({
    url: `https://https://64a6ad13096b3f0fcc8042b9.mockapi.io/productPhone/${productId}`,
    method: "GET",
  });
}

function apiCreateProduct(product) {
  return axios({
    url: "https://https://64a6ad13096b3f0fcc8042b9.mockapi.io/productPhone",
    method: "POST",
    data: product,
  });
}

function apiUpdateProduct(productId, newProduct) {
  return axios({
    url: `https://https://64a6ad13096b3f0fcc8042b9.mockapi.io/productPhone/${productId}`,
    method: "PUT",
    data: newProduct,
  });
}

function apiDeleteProduct(productId) {
  return axios({
    url: `https://https://64a6ad13096b3f0fcc8042b9.mockapi.io/productPhone/${productId}`,
    method: "DELETE",
  });
}
