import { useState } from "react";
import { useChat } from "../context/ChatContext";
import "./MessageInput.css";

export default function MessageInput() {
  const { sendMessage } = useChat();
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    const user = localStorage.getItem("user") || "Anon";
    const avatar = localStorage.getItem("avatar") || "/avatar/avatarBlue.png";
    sendMessage({ user, text: text.trim(), avatar });
    setText("");
  };

  return (
    <div className="input-container">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
}