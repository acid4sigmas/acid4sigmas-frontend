import { Link } from "react-router-dom";
import TopBar from "./Topbar";
import "../style/Settings.scss";
import { useEffect, useState } from "react";

export default function Settings() {

  const [loggedIn, setLoggedIn] = useState(false);

  const checkIfLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } 
  }

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
  }

  return (
    <div>
      <TopBar />
      <div className="container">
        <div className="settings-container">
          <div className="settings-container-inner">
            <div className="settings-navlink-container">
              <div className="settings-navlink">
                <Link to="/settings/themes">Themes</Link>
                {loggedIn ? (
                <div className="logout-btn">
                  <button onClick={handleLogout}>Logout</button>
                </div>
                ) : (
                <div></div>
                )}
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
