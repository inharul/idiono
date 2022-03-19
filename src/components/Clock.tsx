import React from "react";
import { Default } from "../AppStyle";
import styled from "styled-components";
import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";

const Clock: React.FC = () => {
  // eslint-disable-next-line
  const [clockFormat, setClockFormat] = useLocalStorage<boolean>(
    "clock-format-12",
    true
  );
  let date = new Date();
  let checkHour: any;
  if (clockFormat && date.getHours() > 12) {
    checkHour = date.getHours() - 12;
  } else if (clockFormat && date.getHours() === 0) {
    checkHour = 12;
  } else {
    checkHour = date.getHours();
  }
  const [hours, setHours] = useState<any>(checkHour);
  const [minutes, setMinutes] = useState<any>(
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  );
  const [ampm, setampm] = useState<any>(date.getHours() >= 12 ? "PM" : "AM");

  useEffect(() => {
    const intervalId = setInterval(() => {
      let date = new Date();
      let hh: any = date.getHours();
      let mm: any = date.getMinutes();
      let ampm: any = hh >= 12 ? "PM" : "AM";

      if (clockFormat) {
        if (hh > 12) {
          hh = hh - 12;
        } else if (hh === 0) {
          hh = 12;
        }
      }

      if (mm < 10) {
        mm = `0${mm}`;
      }
      setHours(hh);
      setMinutes(mm);
      setampm(ampm);
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, []);
  return (
    <ClockContainer>
      <Default>
        <ClockTime>
          {hours}:{minutes}
          {clockFormat ? <ClockAmPm>{ampm}</ClockAmPm> : ""}
        </ClockTime>
      </Default>
    </ClockContainer>
  );
};

const ClockContainer = styled.div`
  flex: 0.15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--fontColor);
  font-family: Poppins;
  transition: all 500ms ease-in-out;
`;
const ClockTime = styled.div`
  font-size: 98px;
  position: relative;
  cursor: default;
  user-select: none;
  text-shadow: 3px 3px 8px #00000033;
`;
const ClockAmPm = styled(ClockTime)`
  font-size: 16px;
  position: absolute;
  top: 33px;
  right: -30px;
`;

export default Clock;
