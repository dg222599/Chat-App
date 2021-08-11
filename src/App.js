import React from "react";
import { ChatEngine } from "react-chat-engine";
import Login from "./components/Login";
import ChatFeed from "./components/ChatFeed";
import { projectID } from "./constants";
import "./App.css";

const App = () => {
  if (!localStorage.getItem("username")) return <Login />;

  const authObject = {
    "Project-ID": projectID,
    "User-Name": localStorage.getItem("username"),
    "User-Secret": localStorage.getItem("password"),
  };

  return (
    <div>
      <ChatEngine
        height="100vh"
        projectID={projectID}
        userName={localStorage.getItem("username")}
        userSecret={localStorage.getItem("password")}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        onNewMessage={() => new Audio("/click.mp3").play()}
      />
    </div>
  );
};

export default App;
