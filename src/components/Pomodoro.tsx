import React, { useState, useEffect, useRef } from "react";
import useLocalStorage from "use-local-storage";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Slider } from "antd";
import { Default } from "../AppStyle";
import styled from "styled-components";
import play from "../img/play.svg";
import pause from "../img/pause.svg";

const Pomodoro: React.FC = () => {
  const sound = require("../audio/pomo.mp3");
  const [workTime, setWorkTime] = useLocalStorage<number>("work-time", 25);
  const [restTime, setRestTime] = useLocalStorage<number>("rest-time", 5);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work");
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds = (nextMode === "work" ? workTime : restTime) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = workTime * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        new Audio(sound).play();
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [workTime, restTime, sound]);

  const totalSeconds = mode === "work" ? workTime * 60 : restTime * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds: string | number = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <PomodoroOverlay>
      <PomodoroLeft>
        <CircularProgressbar
          value={percentage}
          text={`${minutes}:${seconds}`}
          styles={buildStyles({
            textColor: mode === "work" ? "#3e98c7" : "#52b57b",
            pathColor: mode === "work" ? "#3e98c7" : "#52b57b",
          })}
        />

        <PlayButton
          onClick={() => {
            setIsPaused(!isPaused);
            isPausedRef.current = !isPaused;
          }}
        >
          {isPaused ? (
            <img src={play} draggable={false} alt="play" />
          ) : (
            <img src={pause} draggable={false} alt="pause" />
          )}
        </PlayButton>
      </PomodoroLeft>
      {isPaused && (
        <PomodoroRight>
          <Default margin="20px 0">
            <span>
              Work
              <b> - {`${workTime}:00`}</b>
            </span>
            <Slider
              defaultValue={workTime}
              disabled={false}
              max={60}
              min={1}
              onChange={(e: number) => setWorkTime(e)}
              trackStyle={{ backgroundColor: "#3e98c7" }}
              handleStyle={{ border: "2px solid #808080" }}
            />
          </Default>
          <Default margin="20px 0">
            <span>
              Rest
              <b> - {`${restTime}:00`}</b>
            </span>
            <Slider
              defaultValue={restTime}
              disabled={false}
              max={60}
              min={1}
              onChange={(e: number) => setRestTime(e)}
              trackStyle={{ backgroundColor: "#52b57b" }}
              handleStyle={{ border: "2px solid #808080" }}
            />
          </Default>
        </PomodoroRight>
      )}
    </PomodoroOverlay>
  );
};

const PomodoroOverlay = styled.div`
  font-family: Poppins;
  width: 100vw;
  z-index: 2;
  color: var(--fontColor);
  text-align: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  transition: all ease-in-out 500ms;
  background: var(--background);
`;
const PomodoroRight = styled.div`
  width: 300px;
  height: 300px;
  user-select: none;
  position: relative;
  text-align: left;
  span {
    margin-left: 7px;
    b {
      color: #808080;
      font-weight: 100;
    }
  }
`;
const PomodoroLeft = styled.div`
  user-select: none;
  transition: all ease-in-out 500ms;
`;

const PlayButton = styled.button`
  margin-top: 15px;
  cursor: pointer;
  user-select: none;
  background: transparent;
  border: none;
  outline: none;
  img {
    height: 80px;
    width: 80px;
  }
`;

export default Pomodoro;
