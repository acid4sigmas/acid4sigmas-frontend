import { useState } from "react";
import TopBar from "../Topbar";
import config from '../../config.json';
import { useNavigate } from "react-router-dom";

import { Response } from "../../types";

export default function Login() {

    const nav = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);

        const fetchLogin = async () => {
            try {
                const result = await fetch(config.api_url + "/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "username_or_email": username,
                        "password": password
                    })
                });

                const response: Response = await result.json();
                console.log(response);

                if (response.message) {
                    console.log("a message");
                } else if (response.token) {
                    console.log("a token");
                    localStorage.setItem("token", response.token)
                    nav("/");
                    
                } else if (response.error) {
                    console.log("error message");
                    setError(response.error);
                } else {
                    console.log("unknown message type");
                }
                
                
            } catch (e) {
                setError(String(e));
            }
        }

        fetchLogin();
    };


    return (
    <div>
        <TopBar />
        <div className="container">
            <div className="centered-container">
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <label>username or email</label>
                        <br/>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                            required
                        />
                        <br/>
                        <br/>
                        <label>password</label>
                        <br/>
                        <input 
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            required
                        />
                        <br/>
                        <br/>
                        <input type="submit" name="login" value="login"></input>
                    </form>
                    <p>If you havent already, you may need to verify your email.</p>
                    <p>navigate to Open Navbar → Settigns → Verify Email</p>
                    <p>If you do not verify your email you cannot use the api services.</p>
                    <div className="error-msg-container">
                        <h4 className="error-msg-container-h4">{error}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}