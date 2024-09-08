import TopBar from "./Topbar";
import {Container, CenteredContainer} from "../components/Container";

import { useNavigate } from "react-router-dom";


export default function LoginRegister() {
    const nav = useNavigate();

    return (
    <div>
        <TopBar />
        <Container>
            <CenteredContainer>
                <br/>
                <h1>Your Acid4Sigmas Account</h1>
                <div>
                    <div>
                        <button 
                            className="p-[2vh_6vh_2vh_6vh] mt-3 bg-secondary border-none rounded-lg shadow-md text-primary-text-color text-md hover:opacity-80"
                            onClick={() => nav("/auth/login")}
                        >
                            Login
                        </button>
                    </div>
                    <span>or</span>
                    <div>
                        <button 
                            className="p-[2vh_6vh_2vh_6vh] mt-3 bg-secondary border-none rounded-lg shadow-md text-primary-text-color text-md hover:opacity-80"
                            onClick={() => nav("/auth/register")}
                        >
                        Register
                        </button>
                    </div>
                </div>
                <br/>
                <hr />
                <br />
                <div className="flex justify-center align-middle">
                    <div className="bg-background-secondary w-fit p-10  rounded-lg list-none">
                        <h1>FAQ</h1>
                        <details>
                            <summary>Why would i even sign up?</summary>
                            <li>- cloud themes! (expected feature!)</li>
                        </details>
                    </div>
                </div>
            </CenteredContainer>
        </Container>
    </div>
    )
}