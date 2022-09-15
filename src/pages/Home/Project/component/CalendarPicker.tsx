import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";

function CalendarPicker() {
  const [value, onChange] = useState(new Date());
  return (
    <CalendarBox>
      <Calendar onChange={onChange} value={value} />
    </CalendarBox>
  );
}

export default CalendarPicker;

const CalendarBox = styled.div`
  width: 100%;
  height: 280px;
  display: flex;
  flex-direction: column;
`;
