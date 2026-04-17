import { useState } from "react";
import Swal from "sweetalert2";

import { ChatProvider } from "./context/ChatContext";

import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import StatusIndicator from "./components/StatusIndicator";
import AvatarSelector from "./components/AvatarSelector";
import UsernameGate from "./components/UsernameGate";
import "./App.css";

function App() {

  const [isReady, setIsReady] = useState(() => Boolean(localStorage.getItem("user")));

  const resetUser = async () => {
    const result = await Swal.fire({
      title: "Cambiar usuario",
      text: "Se borrara tu sesion local.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, continuar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#475569",
      reverseButtons: true,
      background: "#0f172a",
      color: "#e2e8f0"
    });

    if (!result.isConfirmed) return;

    localStorage.clear();
    setIsReady(false);
  };

  if (!isReady) {
    return <UsernameGate onContinue={() => setIsReady(true)} />;
  }

  return (

    <ChatProvider>

      <div className="app">
        <header className="app-header">
          <h2 className="app-title">Chat <span className="app-title-accent">React</span></h2>
          <div className="header-actions">
            <StatusIndicator />
            <button className="change-user-button" onClick={resetUser}>
              Cambiar usuario
            </button>
          </div>
        </header>

        <div className="app-body">
          <AvatarSelector />
          <ChatWindow />
          <MessageInput />
        </div>
      </div>

    </ChatProvider>

  );

}

export default App;