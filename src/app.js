import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { cartsRouter } from "./routes/carts.router.js";
import { productsRouter } from "./routes/products.router.js";
import { home } from "./routes/home.router.js";
import { realTimeProducts } from "./routes/realtimeproducts.router.js";
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

//CONFIG DE SOCKET.IO
const httpServer = app.listen(PORT, () => {
  console.log(`Example app listening http://localhost:${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  //BACK MANDA MSGS AL FRONT
  setInterval(() => {
    socket.emit("msg_back_front", {
      msg: "hola mundo desde el back " + Date.now(),
      from: "server",
    });
    socketServer.emit();
  }, 1000);

  //BACK ATAJA LOS MSGS DEL FRONT
  socket.on("msg_front_back", (msg) => {
    console.log(msg);
  });
});

//TODOS MIS ENDPOINTS
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/home", home);
app.use("/realtimeproducts", realTimeProducts);

//OTROS ENDPOINTS
app.get("*", (req, res) => {
  return res
    .status(404)
    .json({ status: "error", msg: "No se encuentra esa ruta", data: {} });
});
