import React from "react";
import { attemptLogin } from "../../DataFetcher";
import { useHistory } from "react-router-dom";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  onLogin,
  destPath,
}) => {
  const history = useHistory();

  const inputUsernamePasswordStyle = {
    border: "0",
    background: "none",
    display: "block",
    margin: "20px auto",
    textAlign: "left",
    borderBottom: "1px solid #979797",
    padding: "14px 10px",
    width: "200px",
    outline: "none",
    color: "black",
  };

  const loginButtonStyle = {
    display: "block",
    margin: "25px auto",
    textAlign: "center",
    border: "2px solid #979797",
    padding: "14px 10px",
    width: "200px",
    outline: "none",
    color: "white",
    borderRadius: "10px",
    borderColor: "#03DAC5",
    background: "#03DAC5",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await attemptLogin(username, password)
      .then((data) => {
        if (data.loggedIn) {
          onLogin();
          history.push("/" + destPath);
        }
      })
      .catch(console.log);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="username"
        placeholder="Shortcode"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={inputUsernamePasswordStyle}
      />
      <input
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputUsernamePasswordStyle}
      />
      <input type="submit" value="LOGIN" style={loginButtonStyle} />
    </form>
  );
};

export default LoginForm;
