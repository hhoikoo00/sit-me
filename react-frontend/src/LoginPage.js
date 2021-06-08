import React, { useState } from "react";
// import { useParams, useHistory } from "react-router-dom";
import"./css/index.css"
import sitMeLogo from "./assets/logos/sitMeLogo.png"
import axios from "axios";

const apiURL = "http://localhost:5000/imperial-drp-sit-me/europe-west2/api";

const LoginForm = ({ username, setUsername, password, setPassword }) => {
    
    const inputUsernamePasswordStyle = {
        "border": "0",
        "background": "none",
        "display": "block",
        "margin": "20px auto",
        "text-align": "left",
        "border-bottom": "1px solid #979797",
        "padding": "14px 10px",
        "width": "200px",
        "outline": "none",
        "color": "black"
    } 

    const loginButtonStyle = {
        "display": "block",
        "margin": "20px auto",
        "text-align": "center",
        "border": "2px solid #979797",
        "padding": "14px 10px",
        "width": "200px",
        "outline": "none",
        "color": "white",
        "border-radius": "10px",
        "border-color": "#03DAC5",
        "background": "#03DAC5"
    }

    const handleSubmit =  async (event) => {
        event.preventDefault();
        await axios.post(
            `${apiURL}"/login`,
            {
                shortcode: username,
                password: password
            }
        )
        .then(console.log)
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
const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // const history = useHistory();
    
    // const destPath = useParams().dest || "";

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
    "text-align": "center"
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
                />
            </div>
        </div>
        );
}

export default LoginPage;