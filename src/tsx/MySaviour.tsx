// here you will thank jesus christ for guiding you throughout your life 

import { Container } from "../components/Container";
import TopBar from "./Topbar"
import cross_bg from '../assets/crosses.png'

export default function MySaviour() {
    return (
    <div className="min-h-screen w-full" style={{
        backgroundImage: `url(${cross_bg})`,  
        backgroundSize: "cover",             
        backgroundPosition: "center",         
      }}>
        <TopBar />
        <Container>
            <div className="w-[100%] h-full">
            </div>
        </Container>
    </div>
    );
}