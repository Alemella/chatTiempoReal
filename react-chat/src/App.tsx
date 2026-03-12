import { useEffect } from "react";

import { ChatProvider } from "./context/ChatContext";

import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import StatusIndicator from "./components/StatusIndicator";
import AvatarSelector from "./components/AvatarSelector";
import "./App.css";

function App() {

  useEffect(() => {

    const avatar = localStorage.getItem("avatar");

    if (!avatar) {
      localStorage.setItem("avatar", "/avatar/avatarBlue.png");
    }

  }, []);

  return (

    <ChatProvider>

      <div className="app">
        <header className="app-header">
          <h2 className="app-title">Chat <span className="app-title-accent">React</span></h2>
          <StatusIndicator />
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