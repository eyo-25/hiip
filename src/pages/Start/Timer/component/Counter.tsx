import { query } from "firebase/firestore";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dbService } from "../../../../firebase";
import { counterState, readyState, timeState } from "../../../../Recoil/atoms";
import { BreakTimer } from "./BreakCounter";
import { IntervalCounter } from "./IntervalCounter";

const useCounter = (setMin: any, setSec: any) => {
  const countRef = useRef<any>(setMin * 60 + setSec);
  const [count, setCount] = useState(setMin * 60 + setSec);
  const intervalRef = useRef<any>(null);
  const start = useCallback(() => {
    intervalRef.current = setInterval(() => {
      if (intervalRef.current === null) return;
      if (0 < countRef.current) {
        countRef.current -= 1;
        setCount(countRef.current);
      } else if (countRef.current < 0) {
        clearInterval(intervalRef.current);
      }
    }, 1000);
  }, []);
  const stop = useCallback(() => {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
  }, []);
  const reset = useCallback(() => {
    countRef.current = setMin * 60 + setSec;
    setCount(countRef.current);
    clearInterval(intervalRef.current);
  }, []);
  const done = useCallback(() => {
    countRef.current = 0;
    setCount(countRef.current);
    clearInterval(intervalRef.current);
  }, []);
  return { count, start, stop, reset, done };
};

function Counter() {
  const navigate = useNavigate();
  const [readyToDo, setReadyToDo] = useRecoilState(readyState);
  const [counterStatus, setCounterStatus] = useRecoilState<any>(counterState);
  const [time, setTime] = useRecoilState<any>(timeState);

  useEffect(() => {
    setCounterStatus(
      time.intervalSet === time.breakSet && 0 < time.breakSet ? true : false
    );
  }, []);

  const onBackClick = () => {
    navigate(`/`);
  };

  return (
    <>
      {!counterStatus && <IntervalCounter useCounter={useCounter} />}
      {counterStatus && <BreakTimer useCounter={useCounter} />}
      <button onClick={onBackClick}>back</button>
    </>
  );
}

export default React.memo(Counter);

export const CountBox = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const CountText = styled.div`
  display: flex;
  font-family: "Roboto";
  font-weight: 900;
  font-size: 80px;
  letter-spacing: -3px;
  &:nth-child(2) {
    margin-bottom: 8px;
    font-size: 70px;
  }
`;
