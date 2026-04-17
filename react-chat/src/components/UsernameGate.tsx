import { useState } from "react";
import type { FormEvent } from "react";
import "./UsernameGate.css";

interface UsernameGateProps {
  onContinue: (username: string) => void;
}

export default function UsernameGate({ onContinue }: UsernameGateProps) {
  const [username, setUsername] = useState(localStorage.getItem("user") || "");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = username.trim();
    if (!normalized) return;

    localStorage.setItem("user", normalized);

    if (!localStorage.getItem("avatar")) {
      localStorage.setItem("avatar", "/avatar/avatarBlue.png");
    }

    onContinue(normalized);
  };

  return (
    <main className="username-gate">
      <section className="username-card">
        <p className="username-eyebrow">Realtime Chat</p>
        <h1 className="username-title">Elige tu nombre para entrar</h1>
        <p className="username-subtitle">
          Es un paso rapido para identificar tus mensajes en React y Vue.
        </p>

        <form className="username-form" onSubmit={submit}>
          <label htmlFor="username" className="username-label">
            Nombre de usuario
          </label>
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Ej: User123"
            autoFocus
            maxLength={24}
          />

          <button type="submit" disabled={!username.trim()}>
            Entrar al chat
          </button>
        </form>
      </section>
    </main>
  );
}
