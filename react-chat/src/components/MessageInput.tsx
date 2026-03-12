import { useState } from "react";
import { useChat } from "../context/ChatContext";
import "./MessageInput.css";

export default function MessageInput() {
  const { sendMessage } = useChat();
  const [text, setText] = useState("");

  const [user] = useState(() => {
    const saved = localStorage.getItem("user");
    if (saved) return saved;
    const name = prompt("Tu nombre") || "Anon";
    localStorage.setItem("user", name);
    return name;
  });

  const handleSend = () => {
    if (!text.trim()) return;
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