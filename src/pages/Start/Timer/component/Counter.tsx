import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { intervalState } from "../../../../Recoil/atoms";

const padNumber = (num: any, length: any) => {
  return String(num).padStart(length, "0");
};

const Counter = () => {
  const [time, setTime] = useRecoilState(intervalState);
  const [save, setSave] = useState({});
  const navigate = useNavigate();
  // 타이머를 초단위로 변환한 initialTime과 setInterval을 저장할 interval ref
  // useRef는 값이 변화하더라도 리랜더링을 발생시키지 않아 useEffect를 호출하지 않는다.
  const initialTime = useRef<any>(time.min * 60 + time.sec);
  const initialBreakTime = useRef<any>(time.breakMin * 60 + time.breakSec);
  const interval = useRef<any>(null);

  const [intervalSet, setIntervalSet] = useState<number>(time.interval);
  const [min, setMin] = useState(padNumber(time.min, 2));
  const [sec, setSec] = useState(padNumber(time.sec, 2));
  const [breakSet, setBreakSet] = useState<number>(time.interval - 1);
  const [breakMin, setBreakMin] = useState(padNumber(time.breakMin, 2));
  const [breakSec, setbBreakSec] = useState(padNumber(time.breakSec, 2));

  const [isStart, setIsStart] = useState(false);

  const onStopClick = () => {
    if (initialTime.current === 0) return;
    if (initialBreakTime.current === 0) return;
    clearInterval(interval.current);
    setIsStart(false);
  };

  const onStartClick = () => {
    setIsStart(true);
  };

  const onBackClick = () => {
    navigate("/");
  };
  useEffect(() => {
    if (isStart && intervalSet < breakSet + 1) {
      interval.current = setInterval(() => {
        if (breakSet <= 0) return;
        if (0 < initialBreakTime.current) {
          initialBreakTime.current -= 1;
          setbBreakSec(padNumber(initialBreakTime.current % 60, 2));
          setBreakMin(
            padNumber(parseInt((initialBreakTime.current / 60) as any), 2)
          );
        } else if (0 < intervalSet && initialBreakTime.current === 0) {
          clearInterval(interval.current);
          setBreakSet((prev: number) => prev - 1);
          initialBreakTime.current = time.breakMin * 60 + time.breakSec;
          setBreakMin(padNumber(time.breakMin, 2));
          setbBreakSec(padNumber(time.breakSec, 2));
          setIsStart(false);
        }
      }, 1000);
    }
    //clean up 함수
    return () => clearInterval(interval.current);
  }, [isStart]);

  useEffect(() => {
    if (intervalSet === 0) {
      setSec(padNumber(0, 2));
      setIsStart(false);
    }
    if (isStart && breakSet < intervalSet) {
      interval.current = setInterval(() => {
        if (intervalSet <= 0) return;
        if (0 < initialTime.current) {
          initialTime.current -= 1;
          setSec(padNumber(initialTime.current % 60, 2));
          setMin(padNumber(parseInt((initialTime.current / 60) as any), 2));
        } else if (0 < intervalSet) {
          clearInterval(interval.current && initialTime.current === 0);
          setIntervalSet((prev: number) => prev - 1);
          setMin(padNumber(time.min, 2));
          setSec(padNumber(time.sec, 2));
          setIsStart(false);
          initialTime.current = time.min * 60 + time.sec;
        }
      }, 1000);
    }
    // clean up 함수
    return () => clearInterval(interval.current);
  }, [isStart]);

  return (
    <>
      <div>{intervalSet}SET</div>
      {intervalSet < breakSet + 1 && 0 < breakSet && <div>Break T</div>}
      {intervalSet < breakSet + 1 && 0 < breakSet && (
        <CountText>
          {breakMin}
          <span>:</span>
          {breakSec}
        </CountText>
      )}
      {(breakSet < intervalSet || intervalSet === 0) && (
        <CountText>
          {min}
          <span>:</span>
          {sec}
        </CountText>
      )}
      <button onClick={onStartClick}>start</button>
      <button onClick={onStopClick}>stop</button>
      <button onClick={onBackClick}>back</button>
    </>
  );
};

export default Counter;

export const CountText = styled.div`
  display: flex;
  font-family: "Roboto";
  font-weight: 900;
  font-size: 80px;
  letter-spacing: -3px;
`;
