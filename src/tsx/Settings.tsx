import { Link } from "react-router-dom";
import TopBar from "./Topbar";
import "../style/Settings.scss";

export default function Settings() {
  return (
    <div>
      <TopBar />
      <div className="container">
        <div className="settings-container">
          <div className="settings-container-inner">
            <div className="settings-navlink-container">
              <div className="settings-navlink">
                <Link to="/settings/themes">Themes</Link>
              </div>
            </div>
            <div className="settings-content">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
