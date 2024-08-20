import TopBar from "./Topbar";

import '../style/LoginRegister.scss'
import { useNavigate } from "react-router-dom";

export default function LoginRegister() {
    const nav = useNavigate();

    return (
    <div>
        <TopBar />
        <div className="container">
            <div className="centered-container">
                <br/>
                <h1>Your Acid4Sigmas Account</h1>
                <div className="login-or-register-container">
                    <div className="login-or-register-btn-div">
                        <button className="real-login-btn" onClick={() => nav("/auth/login")}>Login</button>
                    </div>
                    <span>or</span>
                    <div className="login-or-register-btn-div">
                        <button>Register</button>
                    </div>
                </div>
                <br/>
                <hr />
                <div className="acc-faq-container">
                    <div className="acc-faq-container-inner">
                        <h1>FAQ</h1>
                        <details>
                            <summary>Why would i even sign up?</summary>
                            <li>- cloud themes! (expected feature!)</li>
                        </details>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    )
}