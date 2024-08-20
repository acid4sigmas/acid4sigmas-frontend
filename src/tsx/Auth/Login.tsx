import { useState } from "react";
import TopBar from "../Topbar";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                </div>
            </div>
        </div>
    </div>
    )
}