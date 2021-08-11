import { useState } from "react";
import axios from "axios";
import { InfoCircleOutlined } from "@ant-design/icons";

import { projectID } from "../constants";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = {
      "Project-ID": projectID,
      "User-Name": username,
      "User-Secret": password,
    };

    try {
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      window.location.reload();
      setError("");
    } catch (error) {
      setError("Wrong Credentials please try again!!!");
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Welcome to the Chat-App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Username"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
            required
          />
          <div align="center">
            <button type="submit" className="button">
              <span>Login</span>
            </button>
          </div>
        </form>
        <h4 className="error">{error}</h4>
        <div className="info">
          <span>
            <InfoCircleOutlined style={{ color: "rgb(150,15,15)" }} />
          </span>{" "}
          Use (Admin,admin) as username,password for test purpose!
        </div>
      </div>
    </div>
  );
};

export default Login;
