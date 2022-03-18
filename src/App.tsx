import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import Clock from "./components/Clock";
import swal from "sweetalert";

import moon from "./img/moon.svg";
import sun from "./img/sunny.svg";
import editdark from "./img/pencil-dark.svg";
import editlight from "./img/pencil-light.svg";
import settingsdark from "./img/settings-dark.svg";
import settingslight from "./img/settings-light.svg";
import yt from "./img/youtube.svg";
import dc from "./img/discord.svg";
import pomodark from "./img/timerdark.svg";
import pomolight from "./img/timerlight.svg";
import plus from "./img/plus.svg";

import {
  AddShortcut,
  AddShortcutForm,
  AddTile,
  AddTileIcon,
  AddTileText,
  AppContainer,
  AppMain,
  BackgroundGradient,
  BackgroundImage,
  Default,
  PomodoroToggler,
  SearchForm,
  SetBackground,
  Settings,
  SettingsDropdown,
  SettingsFooter,
  SettingsOption,
  Shortcuts,
  ThemeToggler,
  UpdateBackground,
} from "./AppStyle";
import DateTime from "./components/DateTime";
import { Button, Drawer, Input, Select, Switch } from "antd";
import Pomodoro from "./components/Pomodoro";
import Search from "./components/Search";

const getShortcuts = () => {
  const data = localStorage.getItem("shortcuts");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function App() {
  let date = new Date();
  const Option = Select.Option;
  const [shortcuts, setShortcuts] = useState(getShortcuts);
  const [shortcutTitle, setShortcutTitle] = useState("");
  const [shortcutLink, setShortcutLink] = useState("");
  const handleAddShortcutSubmit = (e: any) => {
    e.preventDefault();
    let newShortcut = {
      title: shortcutTitle,
      icon:
        "chrome://favicon2/?size=24&scale_factor=1x&show_fallback_monogram=&page_url=" +
        shortcutLink,
      link: shortcutLink,
    };
    setShortcuts([...shortcuts, newShortcut]);
    setShortcutTitle("");
    setShortcutLink("");
    setshowAdder(false);
  };
  useEffect(() => {
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  }, [shortcuts]);

  const [theme, setTheme] = useLocalStorage(
    "theme",
    "light" ? "dark" : "light"
  );
  const [backgroundData, setBackgroundData] = useLocalStorage<any>(
    "backgroundImage",
    "none"
  );
  const [clockFormat, setClockFormat] = useLocalStorage<boolean>(
    "clock-format-12",
    true ? false : true
  );

  const [showSearch, setShowSearch] = useLocalStorage<boolean>(
    "show-search",
    false
  );
  const [searchEngine, setSearchEngine] = useLocalStorage<string>(
    "search-url",
    "https://www.google.com/search"
  );
  const [showDateTime, setShowDateTime] = useLocalStorage<boolean>(
    "show-date-time",
    false
  );
  const [showPomodoro, setShowPomodoro] = useLocalStorage<boolean>(
    "show-pomodoro",
    false
  );

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showAdder, setshowAdder] = useState(false);
  return (
    <AppMain data-theme={theme}>
      {backgroundData !== "none" ? (
        <>
          <BackgroundImage style={{ backgroundImage: backgroundData }} />{" "}
          <BackgroundGradient />
        </>
      ) : (
        ""
      )}
      <AppContainer>
        <Clock />
        {showTimer && <Pomodoro />}
        <SearchForm action={searchEngine} method="GET">
          {showSearch && <Search />}
        </SearchForm>
        <Drawer
          style={{ fontFamily: "Roboto" }}
          title="Add a Shortcut"
          width={380}
          onClose={() => setshowAdder(false)}
          visible={showAdder}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <AddShortcutForm
            autoComplete="off"
            onSubmit={handleAddShortcutSubmit}
          >
            <Input
              placeholder="Name"
              required
              value={shortcutTitle}
              onChange={(e) => {
                setShortcutTitle(e.currentTarget.value);
              }}
            />
            <Input
              type="url"
              placeholder="https://site.domain"
              required
              value={shortcutLink}
              onChange={(e) => {
                setShortcutLink(e.currentTarget.value);
              }}
            />
            <Button
              type="primary"
              htmlType="submit"
              style={{ borderRadius: "7px", marginTop: "10px" }}
            >
              Add
            </Button>
          </AddShortcutForm>
        </Drawer>
        <Shortcuts>
          <AddShortcut>
            <AddTile onClick={() => setshowAdder(true)}>
              <AddTileIcon>
                <img src={plus} alt="plus" draggable={false} />
              </AddTileIcon>
              <AddTileText>
                <p>Add Shortcut</p>
              </AddTileText>
            </AddTile>
          </AddShortcut>
          {/* other shortcuts */}
        </Shortcuts>
      </AppContainer>
      <ThemeToggler
        onClick={() => {
          const newTheme = theme === "light" ? "dark" : "light";
          setTheme(newTheme);
        }}
      >
        {theme === "light" ? (
          <img draggable={false} src={moon} alt="moon" />
        ) : (
          <img draggable={false} src={sun} alt="sun" />
        )}
      </ThemeToggler>
      {showPomodoro && (
        <PomodoroToggler onClick={() => setShowTimer(!showTimer)}>
          {theme === "light" ? (
            <img draggable={false} src={pomodark} alt="timer" />
          ) : (
            <img draggable={false} src={pomolight} alt="timer" />
          )}
        </PomodoroToggler>
      )}

      {showDateTime && <DateTime />}
      <UpdateBackground>
        <label htmlFor="file-upload">
          {theme === "light" ? (
            <img draggable={false} src={editdark} alt="edt" />
          ) : (
            <img draggable={false} src={editlight} alt="edit" />
          )}
        </label>
        <input
          id="file-upload"
          onChange={(e: any) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
              try {
                setBackgroundData(`url(${reader.result})`);
              } catch (err) {
                swal({
                  title: "Oops!",
                  text: "Image size must be smaller than 5MB",
                  icon: "error",
                });
              }
            });
            reader.readAsDataURL(file);
          }}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
        />
      </UpdateBackground>
      <Settings
        onClick={() => {
          setSettingsOpen(!settingsOpen);
        }}
      >
        {theme === "light" ? (
          <img draggable={false} src={settingsdark} alt="settings" />
        ) : (
          <img draggable={false} src={settingslight} alt="settings" />
        )}
      </Settings>
      {settingsOpen && (
        <SettingsDropdown>
          <Default>
            <h1>Settings</h1>
            <SettingsOption>
              <label>12 Hour Clock</label>
              <Switch
                size="small"
                checked={clockFormat}
                onClick={() => {
                  setClockFormat(!clockFormat);
                  window.location.reload();
                }}
              />
            </SettingsOption>
            <SettingsOption>
              <label>Search</label>
              <Switch
                size="small"
                checked={showSearch}
                onClick={() => {
                  setShowSearch(!showSearch);
                }}
              />
            </SettingsOption>
            <SettingsOption>
              <label>Date & Time</label>
              <Switch
                size="small"
                checked={showDateTime}
                onClick={() => {
                  setShowDateTime(!showDateTime);
                }}
              />
            </SettingsOption>
            <SettingsOption>
              <label>Pomodoro</label>
              <Switch
                size="small"
                checked={showPomodoro}
                onClick={() => {
                  setShowTimer(false);
                  setShowPomodoro(!showPomodoro);
                }}
              />
            </SettingsOption>
            <SettingsOption>
              <label>Search Engine</label>
              <Select
                defaultValue={searchEngine}
                style={{ width: 120, fontSize: "13px", background: "0000004d" }}
                onChange={(value) => {
                  setSearchEngine(value);
                }}
                disabled={!showSearch}
              >
                <Option value="https://www.google.com/search">Google</Option>
                <Option value="https://www.bing.com/search">Bing</Option>

                <Option value="https://www.duckduckgo.com/">DuckDuckGo</Option>
                <Option value="https://www.youtube.com/search">YouTube</Option>
              </Select>
            </SettingsOption>
            <Default align="center" margin="10px 0 0 0">
              <SetBackground
                role="button"
                onClick={() => setBackgroundData("none")}
              >
                Set Default Background
              </SetBackground>
            </Default>
          </Default>
          <SettingsFooter>
            <p>© Inharul {date.getFullYear()}</p>
            <Default>
              <a
                href="https://www.youtube.com/channel/UCs0a7Nr4dCwWsWvChKCiN-g"
                target="_blanks"
                rel="noreferrer"
              >
                <img src={yt} draggable={false} alt="youtube" />
              </a>
              <a
                href="https://discord.gg/eTqJ65vUV9"
                target="_blank"
                rel="noreferrer"
              >
                <img src={dc} draggable={false} alt="discord" />
              </a>
            </Default>
          </SettingsFooter>
        </SettingsDropdown>
      )}
    </AppMain>
  );
}

export default App;
