import styled from "styled-components";
import moon from "./img/moon.svg";
import sun from "./img/sunny.svg";
import useLocalStorage from "use-local-storage";
import Clock from "./components/Clock";

function App() {
  const [theme, setTheme] = useLocalStorage(
    "theme",
    "light" ? "dark" : "light"
  );
  return (
    <AppMain data-theme={theme}>
      <Clock />
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
    </AppMain>
  );
}

const AppMain = styled.div`
  /* background: var(--background); */
  background-image: url(https://wallpaperaccess.com/full/127234.jpg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
  transition: all 500ms ease-in-out;
`;

const ThemeToggler = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  background: transparent;
  position: absolute;
  right: 20px;
  top: 20px;
  img {
    width: 24px;
    height: 24px;
  }
`;

export default App;
