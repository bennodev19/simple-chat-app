import express, { Express } from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import router from "./router";
import { addUser, getUser, getUsersInRoom, removeUser } from "./user";
const uniqid = require("uniqid");

const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Router
app.use(router);

// Socket.io

// Is called when a client connects to the backend
io.on("connection", (socket) => {
  console.log(`Socket with Id '${socket.id}' connected!`);

  // Join Event
  socket.on("join", (data: { name: string; room: string }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      name: data.name,
      room: data.room,
    });

    // Trigger some response on the client
    // The callback we call here is than called on the client 'join' emit event with the passed data
    if (error) return callback(error);
    if (!user) return callback("Unknown Error occurred!");

    // Send message to User with welcome message
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });

    // Send all Users in the room an join message
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    // Transfer Room Data to the User Room (since users array has changed)
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  // Message Event
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    if (!user) return callback("Unknown Error occurred!");

    io.to(user.room).emit("message", {
      id: uniqid(),
      userId: user.id,
      text: message,
    });

    callback();
  });

  // Is called when the client disconnected from the socket
  socket.on("disconnect", () => {
    console.log(`Socket with Id '${socket.id}' disconnected!`);

    const user = removeUser(socket.id);

    if (user) {
      // Send all Users in the room an left Mmssage
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });

      // Transfer Room Data to the User Room (since users array has changed)
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

httpServer.listen(PORT, () => {
  console.log("Server has started on port " + PORT);
});
