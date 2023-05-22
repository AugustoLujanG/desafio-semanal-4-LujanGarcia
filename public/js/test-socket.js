const socket = io();

//FRONT MANDA MSGS AL BACK
setInterval(() => {
  socket.emit("msg_front_back", {
    msg: "hola mundo desde el front " + Date.now(),
    from: "usuario anonimo",
  });
}, 1000);

//FRONT ATAJA LOS MSGS DEL BACK
socket.on("msg_back_front", (msg) => {
  console.log(msg);
});
