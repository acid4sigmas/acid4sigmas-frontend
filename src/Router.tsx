import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./tsx/App";
import About from "./tsx/About";
import MySaviour from "./tsx/MySaviour";
import Settings, { RedirectSettingsRoute } from "./tsx/Settings";
import SettingsThemes from "./tsx/Settings/Themes";
import { useEffect } from "react";
import theme from "./style/themes/blue.json";
import LoginRegister from "./tsx/LoginRegister";
import Login from "./tsx/Auth/Login";
import Register from "./tsx/Auth/Register";
import VerifyEmail from "./tsx/Settings/VerifyEmail";
import { Style } from "./types";



export function applyCssTheme(jsonTheme: Style) {
  document.documentElement.style.setProperty(
    "--primary-color-text",
    jsonTheme.primary_color_text
  );
  document.documentElement.style.setProperty(
    "--primary-color",
    jsonTheme.primary_color
  );
  document.documentElement.style.setProperty(
    "--secondary-color",
    jsonTheme.secondary_color
  );
  document.documentElement.style.setProperty(
    "--background-color-primary",
    jsonTheme.background_color_primary
  );
  document.documentElement.style.setProperty(
    "--background-color-secondary",
    jsonTheme.background_color_secondary
  ); 
  document.documentElement.style.setProperty(
    "--background-color-tertiary",
    jsonTheme.background_color_tertiary
  )
  document.documentElement.style.setProperty(
    "--primary-grey",
    jsonTheme.primary_grey
  );
  document.documentElement.style.setProperty(
    "--secondary-grey",
    jsonTheme.secondary_grey
  );
  document.documentElement.style.setProperty(
    "--font-size",
    jsonTheme.font_size
  );

  if (jsonTheme.transparency === false) {
    document.documentElement.style.setProperty("--transparency", "1");
    document.documentElement.style.setProperty("--transparency-blur", "0px");
  } else {
    document.documentElement.style.setProperty(
      "--transparency",
      String(jsonTheme.transparency_value)
    );
    document.documentElement.style.setProperty(
      "--transparency-blur",
      jsonTheme.transparency_blur
    );
  }
}

export default function DomRouter() {
  useEffect(() => {
    const storageKey = "theme";

    const getTheme = localStorage.getItem(storageKey);

    if (getTheme) {
      const jsonTheme: Style = JSON.parse(getTheme);

      applyCssTheme(jsonTheme);

      console.log("theme loaded");
    } else {
      localStorage.setItem(storageKey, JSON.stringify(theme));

      const newTheme: Style = JSON.parse(
        localStorage.getItem(storageKey) ?? "{}"
      );

      applyCssTheme(newTheme);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/mysaviour" element={<MySaviour />} />
        <Route path="/settings" element={<RedirectSettingsRoute />} />
        <Route path="/settings/themes" element={<SettingsThemes />} />
        <Route path="/settings/verify_email" element={<VerifyEmail />} />
        <Route path="/register_or_login" element={<LoginRegister />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
