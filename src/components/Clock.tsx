import styled from "styled-components";
import { useState, useEffect } from "react";

const Clock = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState<any>("00");
  const [ampm, setampm] = useState<any>("AM");
  const [dayweek, setDayWeek] = useState<any>("");
  const [month, setMonth] = useState<any>("");
  const [day, setDay] = useState<string | number>("");
  useEffect(() => {
    const intervalId = setInterval(() => {
      let date = new Date();
      let hh: string | number = date.getHours();
      let mm: string | number = date.getMinutes();
      let day: string | number = date.getDate();
      let dayweek = date.getDay();
      let month = date.getMonth();
      let ampm: any;

      if (hh >= 12) {
        hh = hh - 12;
        ampm = "PM";
      } else {
        ampm = "AM";
      }

      if (hh == 0) {
        hh = 12;
      }

      if (mm < 10) {
        mm = `0${mm}`;
      }
      let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      setDay(day);
      setMonth(months[month]);
      setDayWeek(week[dayweek]);
      setHours(hh);
      setMinutes(mm);
      setampm(ampm);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <ClockContainer>
      <ClockTime>
        {hours}:{minutes}
        <ClockAmPm>{ampm}</ClockAmPm>
      </ClockTime>
    </ClockContainer>
  );
};

const ClockContainer = styled.div`
  flex: 0.15;
  display: flex;
  align-items: center;
  font-family: Poppins;
`;
const ClockTime = styled.div`
  font-size: 98px;
  position: relative;
  cursor: default;
  user-select: none;
  text-shadow: 3px 3px 8px #00000033;
  color: var(--fontColor);
  transition: all 500ms ease-in-out;
`;
const ClockAmPm = styled(ClockTime)`
  font-size: 16px;
  position: absolute;
  top: 33px;
  right: -30px;
`;

export default Clock;
