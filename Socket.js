const express = require("express");
const app = express();

var http = require("http").createServer(app);
var io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const SOCKET_PORT = process.env.SOCKET_PORT || 4000;
http.listen(SOCKET_PORT, function () {
  console.log(`Socket.IO server is running on port ${SOCKET_PORT}`);

  io.on("connection", function (socket) {
    console.log('A user connected'); 
    socket.on("order-placed", function (message) {
      console.log(message);
      socket.broadcast.emit("notification", message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
  });
});

module.exports = io;