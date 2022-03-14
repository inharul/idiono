import styled from "styled-components";

export const AppMain = styled.div`
  z-index: -20;
  background: var(--background);

  min-height: 100vh;
  width: 100vw;
  transition: all 500ms ease-in-out;
`;
export const BackgroundImage = styled.div`
  min-height: 100%;
  min-width: 100%;
  position: fixed;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;
export const BackgroundGradient = styled.div`
  background: radial-gradient(transparent 50%, black),
    linear-gradient(transparent, black);
  opacity: 0.2;
  position: fixed;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
`;

export const ThemeToggler = styled.button`
  outline: none;
  cursor: pointer;
  user-select: none;
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
export const PomodoroToggler = styled.button`
  outline: none;
  user-select: none;
  border: none;
  background: transparent;
  cursor: pointer;
  position: absolute;
  left: 20px;
  top: 20px;
  img {
    width: 24px;
    height: 24px;
  }
`;
export const Settings = styled.button`
  outline: none;
  user-select: none;
  border: none;
  background: transparent;
  cursor: pointer;
  position: absolute;
  right: 20px;
  bottom: 20px;
  img {
    width: 18px;
    height: 18px;
  }
`;
export const SettingsDropdown = styled.div`
  position: absolute;
  width: 300px;
  padding: 20px;
  color: #fff;
  overflow: hidden;
  transition: all ease-in 100ms;
  /* height: 300px; */
  bottom: 50px;
  box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 11%);
  background-color: #0000004d;
  backdrop-filter: blur(5px);
  right: 20px;
  border-radius: 13px;
  h1 {
    user-select: none;
    color: #fff;
    margin: 0;
    font-size: 14px;
  }
`;
export const SetBackground = styled.button`
  outline: none;
  color: #fff;
  user-select: none;
  border: none;
  font-size: 13px;
  text-align: center;
  background: transparent;
  cursor: pointer;
`;
export const SettingsOption = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 0;
  border-bottom: 1px solid var(--borderBottom);
  label {
    user-select: none;
    margin-left: 4px;
  }
`;
export const SettingsFooter = styled.footer`
  display: flex;
  user-select: none;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
  p {
    margin: 0;
    font-size: 11px;
  }
  img {
    width: 18px;
    margin-left: 10px;
    height: 18px;
  }
`;
export const UpdateBackground = styled.div`
  user-select: none;
  background: transparent;
  position: absolute;
  bottom: 20px;
  right: 50px;
  img {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }
`;
interface Props {
  margin?: string;
  padding?: string;
  align?: string;
}
export const Default = styled.div<Props>`
  position: relative;
  margin: ${(props) => (props.margin ? props.margin : 0)};
  padding: ${(props) => (props.padding ? props.padding : 0)};
  text-align: ${(props) => (props.align ? props.align : "left")};
`;
