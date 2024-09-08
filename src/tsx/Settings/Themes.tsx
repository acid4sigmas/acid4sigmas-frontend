import TopBar from "../Topbar";
import "../../style/Settings/Themes.scss";
import { useEffect, useState } from "react";

import redTheme from "../../style/themes/red.json";
import blueTheme from "../../style/themes/blue.json";
import pinkTheme from "../../style/themes/pink.json";
import yellowTheme from "../../style/themes/yellow.json";
import purpleTheme from "../../style/themes/purple.json";
import greenTheme from "../../style/themes/green.json";
import oledTheme from "../../style/themes/oled.json";


import Settings from "../Settings";
import { Style } from "../../types";
import { Container } from "../../components/Container";

export default function SettingsThemes() {
  const [jsonTheme, setJsonTheme] = useState<Style | null>(null);
  const [isTransparencyEnabled, setIsTransparencyEnabled] =
    useState<boolean>(false);

  useEffect(() => {
    const storage = localStorage.getItem("theme");

    if (storage) {
      const jsonTheme_: Style = JSON.parse(storage);

      setJsonTheme(jsonTheme_);

      setIsTransparencyEnabled(jsonTheme_.transparency);
    }
  }, []);

  const handleToggleTransparency = () => {
    setIsTransparencyEnabled((prev) => !prev);
    if (jsonTheme) {
      const updatedTheme = {
        ...jsonTheme,
        transparency: !isTransparencyEnabled,
      };
      setJsonTheme(updatedTheme);
      localStorage.setItem("theme", JSON.stringify(updatedTheme));
    }
  };

  return (
    <div>
      <TopBar />
      <Container>
        <div className="settings-container">
          <div className="settings-container-inner">
            <Settings />
            <div className="settings-content">
              <div className="settings-content-container">
                <div className="settings-content-container-inner">
                  <h2 className="text-4xl font-semibold mb-3">Themes</h2>
                  <hr />
                  <div>
                    <div className="transparency-effects-container">
                      <div className="mt-2">
                        <p className="text-2xl">Transparency effects</p>
                        <p className="mb-2">
                          <small>(requires refresh)</small>
                        </p>
                      </div>
                      <div className="mt-3">
                        <label className="transparency-effects-toggle-switch">
                          <input
                            type="checkbox"
                            checked={isTransparencyEnabled}
                            onChange={handleToggleTransparency}
                          />
                          <div className="transparency-effects-toggle-slider"></div>
                          <div className="transparency-effects-toggle-slider-card">
                            <div className="slider-card-face slider-card-front"></div>
                            <div className="slider-card-face slider-card-back"></div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <hr />
                    <details>
                      <summary>
                        Accent Color <small>(requires refresh)</small>
                      </summary>
                      <SelectableColorBox />
                    </details>
                    <br />
                    <hr/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
const SelectableColorBox = () => {
  const redColor = new Color("#ff2727", "Red");
  const blueColor = new Color("#3737eb", "Blue");
  const pinkColor = new Color("#ff00ee", "Pink");
  const yellowColor = new Color("#f9f950", "Yellow");
  const purpleColor = new Color("#59007f", "Purple");
  const greenColor = new Color("#1cc61c", "Green");
  const blackColor = new Color("#000000", "Black");
  const colors = [
    redColor,
    blueColor,
    pinkColor,
    yellowColor,
    purpleColor,
    greenColor,
    blackColor
  ];
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  const red_theme: Style = redTheme;
  const blue_theme: Style = blueTheme;
  const pink_theme: Style = pinkTheme;
  const yellow_theme: Style = yellowTheme;
  const purple_theme: Style = purpleTheme;
  const green_theme: Style = greenTheme;
  const oled_theme: Style = oledTheme;
  const themes: { [key: string]: Style } = {
    red: red_theme,
    blue: blue_theme,
    pink: pink_theme,
    yellow: yellow_theme,
    purple: purple_theme,
    green: green_theme,
    black: oled_theme
  };

  const toggleSelection = (color: Color) => {
    const newColor: Color | null = color === selectedColor ? null : color;

    if (newColor !== null) {
      setSelectedColor(newColor);

      const themeName = newColor.name.toLowerCase();
      const selectedTheme = themes[themeName];

      if (selectedTheme) {
        console.log(selectedTheme);
        localStorage.setItem("theme", JSON.stringify(selectedTheme));
        window.location.reload();
      } else {
        console.log("Unknown theme.");
      }
    }
  };

  return (
    <div className="accent-color-container">
      {colors.map((color) => (
        <div key={color.name} className="accent-color">
          <div
            className={`box ${selectedColor === color ? "selected" : ""}`}
            onClick={() => toggleSelection(color)}
            style={{ backgroundColor: color.color }}
            title={color.name}
          ></div>
        </div>
      ))}
    </div>
  );
};

class Color {
  color: string;
  name: string;

  constructor(color: string, name: string) {
    this.color = color;
    this.name = name;
  }
  setName(name: string) {
    this.name = name;
  }
  setColor(color: string) {
    this.color = color;
  }
}
