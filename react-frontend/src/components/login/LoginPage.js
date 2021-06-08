import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./css/index.css";
import sitMeLogo from "./assets/logos/sitMeLogo.png";
import LoginForm from "./LoginForm";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const destPath = useParams().dest || "";

  const logoStyle = {
    width: "50vw",
    maxWidth: "200px",
    height: "auto",
    margin: "0 25vw",
  };

  const loginSectionStyle = {
    width: "100vw",
    position: "absolute",
    top: "16vh",
    textAlign: "center",
  };

  return (
    <div className="loginSection" style={loginSectionStyle}>
      <img src={sitMeLogo} alt="SitMeLogo" style={logoStyle} />
      <div id="login details container">
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          onLogin={onLogin}
          destPath={destPath}
        />
      </div>
    </div>
  );
};

export default LoginPage;
