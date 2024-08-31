import { Link, Navigate } from "react-router-dom";
import TopBar from "./Topbar";
import "../style/Settings.scss";
import { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route }from 'react-router-dom';
import SettingsThemes from "./Settings/Themes";
import VerifyEmail from "./Settings/VerifyEmail";

export function RedirectSettingsRoute() {
  return <Navigate to="/settings/themes" />;
}

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
    window.location.replace("/");
  }

  return (
    <div>
      <TopBar />
      <div className="settings-navlink-container">
        <div className="settings-navlink">
          <nav>
            <Link to="/settings/themes">Themes</Link>
            <br/>
            <br />
            <Link to="/settings/verify_email">Verify Email</Link>
            <br />
            <br />
            {loggedIn ? (
                <div className="logout-btn">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <div></div>
              )}
          </nav>
        </div>
      </div>
    </div>
  );
}
