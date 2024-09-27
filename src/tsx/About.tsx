import { useState } from "react"
import { CenteredContainer, Container } from "../components/Container"
import TopBar from "./Topbar"


export default function About() {
    const [copiedText, setCopiedText] = useState<boolean>(false);

    return (
    <div>
        <TopBar />
        <Container>
            <CenteredContainer>
                <h1>Hello!</h1>
                <p>Welcome to my website</p>
                <br/>
                <div className="text-center flex justify-center">
                    <div className="bg-background-tertiary w-fit p-4">
                        <details>
                            <summary>
                                who am i?
                            </summary>
                            <h4>I am klover</h4>
                            <hr/>
                            <ul>
                                <h4>basic informations about me</h4>
                                <li>18 years old male</li>
                                <li>I am a fullstack developer</li>
                            </ul>
                            <hr/>
                            <ul>
                                <h4>Interests and hobbies</h4>
                                <li>Working out physically</li>
                                <li>playing video games (bf 2042, osu)</li>
                                <li>and of course coding</li>
                            </ul>
                            <hr/>
                            <div className="bg-background-secondary mt-2 pb-2 pt-2 pr-4 pl-4 rounded-md">
                                <h3 className="text-red-600">Personal Contact</h3>
                                <p>please consider writing an email to</p>
                                <div 
                                    className="mt-2 mb-2 bg-secondary p-2 rounded-lg shadow-lg"
                                    onClick={() => {
                                        navigator.clipboard.writeText("klover@acid4sigmas.systems");
                                        setCopiedText(true);
                                        setTimeout(() => {
                                           setCopiedText(false);
                                        }, 2500);
                                    }}
                                >
                                    <p>klover@acid4sigmas.systems</p>
                                    <p className="text-grey-100"><small>click to copy</small></p>
                                </div>
                                {copiedText ? (<span className="text-green-500"><b>copied</b></span>) : (<span></span>)}
                                
                            </div>
                        </details>
                    </div>
                </div>
            </CenteredContainer>
        </Container>
    </div>
    )
}