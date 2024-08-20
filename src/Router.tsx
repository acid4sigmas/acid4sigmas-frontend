import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import App from "./tsx/App";
import About from "./tsx/About";
import MySaviour from "./tsx/MySaviour";
import Settings from "./tsx/Settings";
import SettingsThemes from "./tsx/Settings/Themes";
import { useEffect } from "react";
import theme from "./style/themes/blue.json";

export interface Style {
  primary_color_text: string;
  primary_color: string;
  secondary_color: string;
  background_color_primary: string;
  background_color_secondary: string;
  background_color_tertiary: string;

  primary_grey: string;
  secondary_grey: string;

  font_size: string;

  transparency: boolean;
  transparency_value: number;
  transparency_blur: string;
}

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
        <Route path="/settings" element={<Settings />} />

        <Route path="/settings/themes" element={<SettingsThemes />} />
      </Routes>
    </Router>
  );
}
