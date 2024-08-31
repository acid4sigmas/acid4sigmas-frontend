import { Link } from "react-router-dom";
import TopBar from "../Topbar";
import Settings from "../Settings";

export default function VerifyEmail() {
    
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
                                
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}