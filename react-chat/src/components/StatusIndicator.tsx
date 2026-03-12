import { useChat } from "../context/ChatContext";
import "./StatusIndicator.css";

export default function StatusIndicator() {

  const { connected, error } = useChat();

  return (
    <>
      <div className={`status-badge ${connected ? "connected" : "disconnected"}`}>
        <span className="status-dot" />
        <span>{connected ? "Conectado" : "Desconectado"}</span>
      </div>
      {error && <div className="status-error">{error}</div>}
    </>
  );
}