import { useState } from "react";
import TopBar from "../Topbar";
import config from '../../config.json';
import { useNavigate } from "react-router-dom";
import { Response } from "../../types";
import { CenteredContainer, Container } from "../../components/Container";
import { Input } from "../../components/Input";

export default function Register() {
    const nav = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "confirm-password") {
            setConfirmPassword(value);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (password === confirmPassword) {
            console.log("password does match");
            const fetchRegister = async () => {
                try {
                    const result = await fetch(config.api_url + "/auth/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "username": username,
                            "password": password,
                            "email": email
                        })
                    })

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
            fetchRegister();
        } else {
            console.log("password does not match");
            setError("password does not match");
        }
    }

    return (
    <div>
        <TopBar />
        <Container>
            <CenteredContainer>
                <div className="register-form">
                    <form onSubmit={handleSubmit}>
                        <label>username</label>
                        <br />
                        <Input.Text
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                            required
                        />
                        <br />
                        <br />
                        <label>email</label>
                        <br />
                        <Input.Text
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            required
                        />
                        <br />
                        <br />
                        <label>password</label>
                        <br />
                        <Input.Text
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            required
                            password
                        />
                        <br />
                        <br />
                        <label>confirm password</label>
                        <br/>
                        <Input.Text
                            name="confirm-password"
                            value={confirmPassword}
                            onChange={handleInputChange}
                            required
                            password
                        />
                        <br/>
                        <br />
                        <Input.SubmitBtn label="Register" />

                    </form>
                    <p>If you havent already, you may need to verify your email.</p>
                    <p>navigate to Open Navbar → Settigns → Verify Email</p>
                    <p>If you do not verify your email you cannot use the api services.</p>

                </div>
            </CenteredContainer>
        </Container>
    </div>
    )
}