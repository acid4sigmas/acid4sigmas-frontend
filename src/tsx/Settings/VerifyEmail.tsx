import { Link, useNavigate } from "react-router-dom";
import TopBar from "../Topbar";
import Settings from "../Settings";
import { useEffect, useRef, useState } from "react";
import config from '../../config.json';
import { Account } from "../../types";
import { Response } from "../../types";
import { Container, SettingsContainer, SettingsContentContainer } from "../../components/Container";
import { Input } from "../../components/Input";
import { Buttons } from "../../components/Buttons";

const token = localStorage.getItem("token");

export default function VerifyEmail() {
    const [account, setAccount] = useState<Account | undefined>(undefined);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const nav = useNavigate();
    const [code, setCode] = useState("");
    
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

    useEffect(() => {
        console.log(code );
    }, [code])


    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (code === '') {
                throw new Error("please enter a 6 digit code");
            }

            const result = await fetch(config.api_url + "/auth/verify_email", {
                method: 'POST',
                body: JSON.stringify({
                    "token": token,
                    "code": Number(code)
                })
            });

            const response: Response = await result.json();

            if (response.message) {
                setMessage(message); 
            } else if (response.token) {
                localStorage.setItem("token", response.token);
                window.location.reload();
            } else if (response.error) {
                throw new Error(response.error)
            } else {
                console.error("unknown message type!");
            }

        } catch (e) {
            setError(String(e));
        }
    }

    return (
        <div>
            <TopBar />
            <Container>
                <SettingsContainer>
                    <Settings />
                    <SettingsContentContainer>
                        <div className="settings-content-container-inner">
                            <h2>Verify Email</h2>
                            <hr/>
                            <div>
                                {account?.email_verified === false ? 
                                <div>
                                    <p>Your email is not verified</p>
                                    <p>lets change that!</p>
                                    <hr/> 
                                    <div className="verify-email-container">
                                        <h3>Send verification email</h3>
                                        <p>click the button below to send an email to <strong className="text-primary">{account.email}</strong> with a verification code</p>
                                        <Buttons.Default label="Send Email" onClick={sendEmail}/>
                                        <br/>
                                        <hr/>
                                        <br/>
                                        <div>
                                            <h3>Verification Code</h3>
                                            <form onSubmit={handleVerify}>
                                                <label>Enter your verification code</label>
                                                <br/>
                                                <br/>
                                                <Input.Code 
                                                    callback={(o) => setCode(o)}
                                                    name="code"
                                                    value={code}
                                                    regex={/^[0-9]$/}
                                                />
                                                <br/>
                                                <Input.SubmitBtn label="verify"/>
                                            </form>
                                        </div>
                                    </div>
                                </div> 
                                : 
                                <div>
                                    <p>Your email is verified!</p>
                                    <p>No need to attempt to verify it again :)</p>
                                    <p>if you just created your account and you see this, please refresh the site a couple of times</p>
                                </div>
                                }
                            </div>
                            <br/>
                            <hr/>
                            <div>
                                <p className="text-red-600">{error}</p>
                            </div>
                            <div>
                                <p className="text-primary-text-color">{message}</p>
                            </div>


                        </div>
                    </SettingsContentContainer>
                </SettingsContainer>
            </Container>
        </div>
    )
}