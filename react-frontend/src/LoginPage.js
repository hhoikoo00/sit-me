import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
const LoginPage = ({ onLogin }) => {
    const history = useHistory();

    return (
        <div>
            Welcome to the log in page
            <button onClick={useEffect(()=>{
                onLogin();
                history.push("/bookSeat")
            })}>Login</button>

        </div>
    )
}

export default LoginPage;