import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import"./css/index.css"
import sitMeLogo from "./assets/logos/sitMeLogo.png"
import { attemptLogin } from "./DataFetcher"

const LoginForm = ({ username, setUsername, password, setPassword, onLogin, destPath }) => {
    const history = useHistory();
    
    const inputUsernamePasswordStyle = {
        "border": "0",
        "background": "none",
        "display": "block",
        "margin": "20px auto",
        "textAlign": "left",
        "borderBottom": "1px solid #979797",
        "padding": "14px 10px",
        "width": "200px",
        "outline": "none",
        "color": "black"
    } 

    const loginButtonStyle = {
        "display": "block",
        "margin": "20px auto",
        "textAlign": "center",
        "border": "2px solid #979797",
        "padding": "14px 10px",
        "width": "200px",
        "outline": "none",
        "color": "white",
        "borderRadius": "10px",
        "borderColor": "#03DAC5",
        "background": "#03DAC5"
    }

    const handleSubmit =  async (event) => {
        event.preventDefault();
        await attemptLogin(username, password)
        .then((data) => {
            if(data.loggedIn){
                onLogin();
                history.push("/" + destPath);
            }
        })
        .catch(console.log)
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                id="username" 
                placeholder="Shortcode" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                style={inputUsernamePasswordStyle} 
            />
            <input 
                type="password" 
                id="password" 
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)} 
                style={inputUsernamePasswordStyle} 
            />
            <input 
                type="submit" 
                value="LOGIN" 
                style={loginButtonStyle} 
            />
        </form>
    )
}
const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const destPath = useParams().dest || "";

    const logoStyle = {
        "width": "50vw",
        "maxWidth": "200px",
        "height": "auto",
        "margin": "0 25vw"
    }

    const loginSectionStyle = {
    "width": "100vw",
    "position": "absolute",
    "top": "16vh",
    "textAlign": "center"
    }

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
}

export default LoginPage;