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
import { CloudthemesStatus, Style } from "../../types";
import { Container, SettingsContainer, SettingsContentContainer } from "../../components/Container";
import { Buttons } from "../../components/Buttons";

import config from '../../config.json';
import loading_spinner from '../../assets/loading-buffering.gif';

export default function SettingsThemes() {
  const [jsonTheme, setJsonTheme] = useState<Style | null>(null);
  const [isTransparencyEnabled, setIsTransparencyEnabled] = useState<boolean>(false);
  const [isCloudSyncEnabled, setIsCloudSyncEnabled] = useState<boolean>(false);
  const [isCloudSyncEnabledLoading, setIsCloudSyncEnabledLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

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

  const token = localStorage.getItem("token");

  const cloudSync = async () => {
    try {
      if (token !== null) {
        const result = await fetch(config.api_url + "/api/cloudthemes/status", {
          method: "GET",
          headers: {
              "Authorization": token
          }
        });

        if (!result.ok) {
          const response = await result.json();
          throw new Error(response.error)
        }

        const response: CloudthemesStatus = await result.json();
        console.log(response);
        setIsCloudSyncEnabled(response.enabled);
      } else {
        throw new Error("you are not signed in.");
      }
    } catch (e) {
      setError(String(e));
    }
  }

  useEffect(() => {
    cloudSync();
  }, []);

  const handleCloudSync = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (token !== null) {
        setIsCloudSyncEnabledLoading(true);
        const result = await fetch(config.api_url + "/api/cloudthemes/status", {
          method: "POST",
          headers: {
            "Authorization": token
          },
          body: JSON.stringify({
            "enabled": e.target.checked
          })
        });
        
        if (!result.ok) {
          const response = await result.json();
          throw new Error(response.error);
        }

        const response: CloudthemesStatus = await result.json();

        setIsCloudSyncEnabled(response.enabled);
        setIsCloudSyncEnabledLoading(false);
        
      }
    } catch (e) {
      setError(String(e));
      setIsCloudSyncEnabledLoading(false);
    }
  }

  return (
    <div>
      <TopBar />
      <Container>
        <SettingsContainer>
            <Settings />
            <SettingsContentContainer>
                <div className="settings-content-container-inner">
                  <h2>Themes</h2>
                  <hr />
                  <div>
                    <div className="flex justify-between">
                      <div className="mt-3 flex gap-1 mb-3">
                        <p className="text-2xl">Transparency effects</p>
                        <p className="content-center">
                          <small>(requires refresh)</small>
                        </p>
                      </div>
                      <div className="content-center mt-1">
                        <Buttons.Toggle 
                          checked={isTransparencyEnabled}
                          onChange={handleToggleTransparency}
                        />
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
                    <div className="flex justify-between mt-2">
                      <div>
                        <p className="text-2xl">Cloud Sync</p>
                        <p>
                          <small>Sync your current selected theme with the acid4sigmas cloud servers</small>
                        </p>
                      </div>
                      <div className="content-center">
                        <div className="flex gap-2">
                          {isCloudSyncEnabledLoading ? 
                            (
                            <div>
                              <img className="w-8" src={loading_spinner}></img>
                            </div>
                            )
                            :
                            (<div></div>)
                          }
                          <Buttons.Toggle checked={isCloudSyncEnabled} onChange={handleCloudSync}/>
                        </div>
                      </div>
                    </div>
                    <br/>
                    <hr />
                    <br />
                    <p>{error}</p>
                  </div>
                </div>
            
          </SettingsContentContainer>
        </SettingsContainer>
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
