import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../services/socket";

interface Message {
  id: string;
  user: string;
  text: string;
  avatar: string | null;
  time?: string;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (msg: Omit<Message, "id" | "time">) => void;
  connected: boolean;
  error: string;
  reconnect: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: any) => {

  const [messages, setMessages] = useState<Message[]>(() => {

    try {
      const saved = localStorage.getItem("messages");
      if (!saved) return [];
      
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.every(m => m.id && typeof m.id === 'string')
        ? parsed
        : [];
    } catch {
      localStorage.removeItem("messages");
      return [];
    }

  });

  const [connected, setConnected] = useState(socket.connected);
  const [error, setError] = useState("");

  useEffect(() => {
    // Si el socket ya estaba conectado antes de montar el contexto,
    // reflejamos ese estado para no mostrar "Desconectado" por error.
    setConnected(socket.connected);

    socket.on("connect", () => {
      setConnected(true);
      setError("");
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("connect_error", () => {
      setError("Error de conexión. Intentando reconectar...");
    });

    socket.on("message", (msg: Message) => {

      setMessages((prev) => {

        const updated = [...prev, msg];

        localStorage.setItem(
          "messages",
          JSON.stringify(updated)
        );

        return updated;

      });

    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("message");
    };

  }, []);

  const sendMessage = (msg: Omit<Message, "id" | "time">) => {
    socket.emit("message", msg);
  };

  const reconnect = () => {
    setError("");
    if (!socket.connected) {
      socket.connect();
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, connected, error, reconnect }}>
      {children}
    </ChatContext.Provider>
  );

};

export const useChat = () => useContext(ChatContext)!;