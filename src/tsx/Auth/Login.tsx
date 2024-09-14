import { useState } from "react";
import TopBar from "../Topbar";
import config from '../../config.json';
import { useNavigate } from "react-router-dom";

import { Response } from "../../types";
import { CenteredContainer, Container } from "../../components/Container";
import { Input } from "../../components/Input";

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
        <Container>
            <CenteredContainer>
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <label>username or email</label>
                        <br/>
                        <Input.Text
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                            required
                        />
                        <br/>
                        <br/>
                        <label>password</label>
                        <br/>
                        <Input.Text
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            required password
                        />
                        <br/>
                        <br/>
                        <input type="submit" name="login" value="login"></input>
                    </form>
                    <p>If you havent already, you may need to verify your email.</p>
                    <p>navigate to Open Navbar → Settigns → Verify Email</p>
                    <p>If you do not verify your email you cannot use the api services.</p>
                    <div className="error-msg-container">
                        <h4 className="text-red-600">{error}</h4>
                    </div>
                </div>
            </CenteredContainer>
        </Container>
    </div>
    )
}