import { Link, useNavigate } from "react-router-dom";
import '../style/Navbar.scss'


export default function NavBar() {
    const nav = useNavigate();

    return (
        <div className="navbar">
            <div className="navbar-inner">
                <div className="navbar-link" onClick={() => nav("/")}>
                    <div className="navbar-link-inner"><Link to="/">Home</Link></div>
                </div>
                <br/>
                <div className="navbar-link" onClick={() => nav("/about")}>
                    <div className="navbar-link-inner"><Link to="/about">About</Link></div>
                </div>
                <br/>
                <div className="navbar-link" onClick={() => nav("/mysaviour")}>
                    <div className="navbar-link-inner"><Link to="/mysaviour">My Saviour</Link></div>
                </div>
                <br/>
                <div className="navbar-link" onClick={() => nav("/settings")}>
                    <div className="navbar-link-inner"><Link to="/settings">Settings</Link></div>
                </div>
            </div>
        </div>
    )
}