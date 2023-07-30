const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const PORT = 4000;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3002",
  },
}); //in case server and client run on different urls
io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);

  socket.join("clock-room");
  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});
setInterval(() => {
  io.to("clock-room").emit("time", new Date());
}, 1000);
httpServer.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
