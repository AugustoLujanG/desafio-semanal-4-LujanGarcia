import express from "express";
import handlebars from "express-handlebars";
import { cartsRouter } from "./routes/carts.router.js";
import { productsRouter } from "./routes/products.router.js";
import { test } from "./routes/test.router.js";
import { __dirname } from "./utils.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//CONFIG DEL MOTOR DE PLANTILLAS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

//TODOS MIS ENDPOINTS
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//QUIERO DEVOLVER HTML DIRECTO PAGINA COMPLETA ARMADA EN EL BACK
app.use("/test", test);

//OTROS ENDPOINTS
app.get("*", (req, res) => {
  return res
    .status(404)
    .json({ status: "error", msg: "No se encuentra esa ruta", data: {} });
});
