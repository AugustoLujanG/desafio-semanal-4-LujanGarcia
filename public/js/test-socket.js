const socket = io();

const addProduct = document.getElementById("addProductForm");
const titleProd = document.getElementById("titleProd");
const descProd = document.getElementById("descProd");
const catProd = document.getElementById("catProd");
const priceProd = document.getElementById("priceProd");
const codeProd = document.getElementById("codeProd");
const stockProd = document.getElementById("stockProd");
const url = document.getElementById("urlInput");

const deleteProductForm = document.getElementById("deleteProductForm");
const id = document.getElementById("productId");

socket.on("products", (productsList) => {
  const productListContainer = document.getElementById("dynamic-list");
  productListContainer.innerHTML = ""; // Limpiar el contenido existente

  productsList.forEach((product) => {
    const productHTML = `
      <div>
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>ID: ${product.id}</p>
        <p>Código: ${product.code}</p>
        <p>Categoría: ${product.category}</p>
        <p>Stock: ${product.stock}</p>
        <img height="150px" width="150px" src=${product.thumbnails[0]} alt="" />
        <p>Precio: $${product.price}</p>
        <p>Status: ${product.status}</p>
      </div>
    `;

    productListContainer.insertAdjacentHTML("beforeend", productHTML);
  });
});

addProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    title: titleProd.value,
    description: descProd.value,
    code: codeProd.value,
    category: catProd.value,
    thumbnails: url.value,
    stock: parseInt(stockProd.value),
    price: parseInt(priceProd.value),
  };
  socket.emit("new-product", newProduct);
  addProduct.reset();
});

deleteProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("delete-product", parseInt(productId.value));
  deleteProductForm.reset()
});
