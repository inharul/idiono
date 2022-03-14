import React, { useEffect, useState } from "react";
import styled from "styled-components";

const DateTime: React.FC = () => {
  let date = new Date();
  const week = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [day, setDay] = useState<any>(date.getDate());
  const [dayWeek, setDayWeek] = useState<any>(week[date.getDay()]);

  const [month, setMonth] = useState<any>(months[date.getMonth()]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      let date = new Date();
      setDay(date.getDate());
      setDayWeek(week[date.getDay()]);
      setMonth(months[date.getMonth()]);
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, []);

  return (
    <DateTimeContainer>
      {dayWeek}, {day} {month}
    </DateTimeContainer>
  );
};

const DateTimeContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  user-select: none;
  font-size: 22px;
  font-family: Poppins;
  color: var(--fontColor);
  transition: all ease-in 500ms;
`;

export default DateTime;
