import { Link, useNavigate } from "react-router-dom";
import TopBar from "../Topbar";
import Settings from "../Settings";
import '../../style/Settings/VerifyEmail.scss';
import { useEffect, useRef, useState } from "react";
import config from '../../config.json';
import { Account } from "../../types";
import { Response } from "../../types";

const token = localStorage.getItem("token");

export default function VerifyEmail() {
    const [account, setAccount] = useState<Account | undefined>(undefined);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const nav = useNavigate();
    const [code, setCode] = useState(new Array(6).fill(""));

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value)) {
            let newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            
            if (index < 5) {
                inputsRef.current[index + 1]?.focus()
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (code[index] === "") {
                if (index > 0) {
                    inputsRef.current[index - 1]?.focus();
                }
            } else {
                let newCode = [...code];
                newCode[index] = "";
                setCode(newCode);
            }
        }
    };

    const handleSubmit = () => {
        const codeValue = code.join("");
        console.log("Code entered:", codeValue);
    };
    
    useEffect(() => {
        

        if (token !== null) {
            const fetchAccountInfo = async () => {
                try {
                    const result = await fetch(config.api_url + "/api/me", {
                        method: "GET",
                        headers: {
                            "Authorization": token
                        }
                    });

                    if (!result.status) {
                        localStorage.removeItem("token");
                        throw new Error("response failed");
                    }

                    const response: Account = await result.json();
                    console.log(response);
                    setAccount(response);
                } catch (e) {
                    console.log(e);
                    setError(String(e)); 
                }
            }

            fetchAccountInfo();
        }
    }, []);

    const sendEmail = async () => {
        try {
            const result = await fetch(config.api_url + "/auth/send_verification_email", {
                method: 'POST',
                body: JSON.stringify({
                    "token": token
                } )
            });

            const response: Response = await result.json();
            console.log(response);

            if (response.message) {
                console.log("a message");
                setMessage(message);
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

    return (
    <div>
        <TopBar />
        <div className="container">
            <div className="settings-container">
                <div className="settings-container-inner">
                    <Settings />
                    <div className="settings-content">
                        <div className="settings-content-container">
                            <div className="settings-content-container-inner">
                                <h2>Verify Email</h2>
                                <hr/>
                                <div>
                                    {account?.email ? 
                                    <div>
                                        <p>Your email is not verified</p>
                                        <p>lets change that!</p>
                                        <hr/> 
                                        <div className="verify-email-container">
                                            <h3>Send verification email</h3>
                                            <p>click the button below to send an email with a verification code</p>
                                            <div className="send-verification-email-container">
                                                <button onClick={sendEmail}>Send Email</button>
                                            </div>
                                        </div>
                                    </div> 
                                    : 
                                    <div>
                                        <p>Your email is verified!</p>
                                        <p>No need to attempt to verify it again :)</p>
                                    </div>
                                    }
                                </div>
                                <div>
                                    {error}
                                </div>
                                <div>
                                    {message}
                                </div>
                                <hr/>
                                <div>
                                    <h3>Verification Code</h3>
                                    <form>
                                        <label>Enter your verification code</label>
                                        <br/>
                                        <br/>
                                        <div className="verify-code-field">
                                             
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}