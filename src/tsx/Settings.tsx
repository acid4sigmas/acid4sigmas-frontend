import { Link, Navigate } from "react-router-dom";
import TopBar from "./Topbar";
import "../style/Settings.css";
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
      <div className={
        [
          "h-full w-fit",
          "bg-background-secondary",
          "border-r-2 border-l-2 border-t-2 border-b-2",
          "border-r-grey-100 border-l-primary border-t-primary border-b-primary",
          "pr-[3.5vh] pl-[3.5vh]",
          "rounded-tl-lg rounded-bl-lg",
          "drop-shadow-lg"
        ].join(' ')
      }>
        <div className="settings-navlink">
          <nav>
            <Link to="/settings/themes">Themes</Link>
            <br/>
            <br />
            {loggedIn ? (
                <div>
                <Link to="/settings/verify_email">Verify Email</Link>
                <br />
                <br />
                <div className="logout-btn">
                  <button onClick={handleLogout}>Logout</button>
                </div>
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
