const { Server } = require("socket.io");

const PORT = process.env.PORT || 3001;
const configuredOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const io = new Server(PORT, {
  cors: {
    origin: configuredOrigins.length > 0 ? configuredOrigins : "*"
  }
});

console.log(`Socket server running on port ${PORT}`);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("message", (msg) => {
    const message = {
      ...msg,
      id: `${socket.id}-${Date.now()}`,
      time: new Date().toLocaleTimeString()
    };
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});