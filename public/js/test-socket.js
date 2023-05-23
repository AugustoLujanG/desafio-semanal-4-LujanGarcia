const socket = io();

const addProduct = document.getElementById("addProductForm");
const titleProd = document.getElementById("titleProd");
const descProd = document.getElementById("descProd");
const catProd = document.getElementById("catProd");
const priceProd = document.getElementById("priceProd");
const codeProd = document.getElementById("codeProd");
const stockProd = document.getElementById("stockProd");
const url = document.getElementById("urlInput");

socket.on("products", (productsList) => {
  console.log(productsList);
  document.getElementById(
    "dynamic-list"
  ).innerHTML = `<h2>(${productsList.title})</h2> <p>${productsList.id}</p> <p>${productsList.description}</p> <p>Categoría: ${productsList.category}</p> <p>Stock: ${productsList.stock}</p> <img height="150px" width="150px" src=${productsList.url} alt="" /> <p>Precio: ${productsList.price}</p> <p>Status: ${productsList.status}</p>`;
  // return acc + "<h2>" + item.title + "</h2>" + "<p>" + item.description + "</h2>" + "<p>" + "ID: " + "" +"</p>
  // <p>Código: {{code}}</p>
  // <p>Categoría: {{category}}</p>
  // <p>Stock: {{stock}}</p>
  // <img height="150px" width="150px" src={{thumbnails}} alt="" />
  // <p>Precio: ${{price}}</p>
  // <p>Status: {{status}}</p>"
});

addProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    title: titleProd.value,
    description: descProd.value,
    category: catProd.value,
    price: parseInt(priceProd.value),
    code: codeProd.value,
    stock: parseInt(stockProd.value),
  };
  socket.emit("new-product", newProduct);
});
