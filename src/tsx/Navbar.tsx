import { Link, useNavigate } from "react-router-dom";

import { CenteredContainer } from "../components/Container";
import NavbarLink from "../components/NavbarLink";


export default function NavBar() {
    const nav = useNavigate();

    return (
        <div className="w-[250px] fixed h-[100vh] backdrop-blur border-r border-[rgba(255,255,255,calc(var(--transparency)+0.25))] z-10 overflow-hidden ">
            <CenteredContainer>
                <NavbarLink to="/" label="Home" />
                <NavbarLink to="/about" label="About" />
                <NavbarLink to="/mysaviour" label="My Saviour"/>
                <NavbarLink to="/settings" label="Settings" />
            </CenteredContainer>
        </div>
    )
}