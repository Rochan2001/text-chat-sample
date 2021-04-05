const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const options = {
  cors: true,
};
const io = require("socket.io")(httpServer, options);

const port = 8000;

httpServer.listen(port, function () {
  console.log("Listening on port " + port);
});

app.use(express.static("public"));

io.on("connection", function (socket) {
  console.log("Socket connection made " + socket.id);
  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
