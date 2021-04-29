import express, { Express } from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import router from "./router";

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

  socket.on("join", (data: { name: string; room: string }, callback) => {
    const error = !data.name || !data.room;

    console.log("User joined Room", data);

    // Trigger some response on the client
    // The callback we call here is than called on the client 'join' emit event with the passed data
    if (error) {
      callback({ error: "An Error occurred. Please try again!" });
    }
  });

  // Is called when the client disconnected from the socket
  socket.on("disconnect", () => {
    console.log(`Socket with Id '${socket.id}' disconnected!`);
  });
});

httpServer.listen(PORT, () => {
  console.log("Server has started on port " + PORT);
});
