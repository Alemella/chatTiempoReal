import { useChat } from "../context/ChatContext";
import { useEffect, useRef } from "react";
import "./ChatWindow.css";

export default function ChatWindow() {
  const { messages } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      {messages.map((msg, index) => (
        <div key={msg.id || `msg-${index}`} className="message">
          <img
            src={msg.avatar || "/avatar/avatarBlue.png"}
            className="avatar"
          />
          <div className="message-content">
            <strong>{msg.user}</strong>
            <div>{msg.text}</div>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}