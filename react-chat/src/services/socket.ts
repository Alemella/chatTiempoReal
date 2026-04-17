import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL?.trim() || "http://localhost:3001";

export const socket = io(socketUrl, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});