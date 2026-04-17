import { useChat } from "../context/ChatContext";
import "./StatusIndicator.css";

export default function StatusIndicator() {

  const { connected, error, reconnect } = useChat();

  return (
    <>
      <div className={`status-badge ${connected ? "connected" : "disconnected"}`}>
        <span className="status-dot" />
        <span>{connected ? "Conectado" : "Desconectado"}</span>
        {!connected && (
          <button
            type="button"
            className="status-reload"
            onClick={reconnect}
            title="Reintentar conexión"
            aria-label="Reintentar conexión"
          >
            ↻
          </button>
        )}
      </div>
      {error && <div className="status-error">{error}</div>}
    </>
  );
}