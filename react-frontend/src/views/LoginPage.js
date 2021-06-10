import React, { useState } from "react";
import { useParams } from "react-router-dom";

import sitMeLogo from "../assets/logos/sitMeLogo.png";
import ErrorBox from "../components/ErrorBox";
import LoginForm from "../components/Login/LoginForm";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const destPath = useParams().dest || "";
  const param = useParams().param || "";

  const logoStyle = {
    width: "50vw",
    maxWidth: "200px",
    height: "auto",
    margin: "9vw 25vw",
  };

  const loginSectionStyle = {
    width: "100vw",
    position: "absolute",
    top: "17vh",
    textAlign: "center",
  };

  return (
    <div className="loginSection" style={loginSectionStyle}>
      <ErrorBox message={error}/>
      <img src={sitMeLogo} alt="SitMeLogo" style={logoStyle} />
      <div id="login details container">
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          onLogin={onLogin}
          destPath={destPath}
          param={param}
          setError={setError}
        />
      </div>
    </div>
  );
};

export default LoginPage;
