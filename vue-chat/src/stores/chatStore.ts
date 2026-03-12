import { defineStore } from "pinia";
import { socket } from "../services/socket";

interface Message {
  id: string;
  user: string;
  text: string;
  avatar: string;
  time: string;
}

export const useChatStore = defineStore("chat", {

  state: () => {
    try {
      const saved = localStorage.getItem("messages") || "[]";
      const parsed = JSON.parse(saved);
      return {
        messages: Array.isArray(parsed) && parsed.every(m => m.id && typeof m.id === 'string')
          ? parsed
          : [],
        connected: false,
        initialized: false,
        error: ""
      };
    } catch {
      localStorage.removeItem("messages");
      return {
        messages: [],
        connected: false,
        initialized: false,
        error: ""
      };
    }
  },

  actions: {

    init() {
      if (this.initialized) return; 
      this.initialized = true;

      socket.on("connect", () => {
        this.connected = true;
        this.error = "";
      });

      socket.on("disconnect", () => {
        this.connected = false;
      });

      socket.on("connect_error", () => {
        this.error = "Error de conexión. Intentando reconectar...";
      });

      socket.on("message", (msg: Message) => {
        this.messages.push(msg);
        localStorage.setItem("messages", JSON.stringify(this.messages));
      });
    },

    cleanup() {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("message");
      this.initialized = false;
    },

    sendMessage(msg: Omit<Message, "id" | "time">) {
      socket.emit("message", msg);
    }
  }
});