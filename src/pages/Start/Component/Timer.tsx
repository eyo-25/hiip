import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { intervalState } from "../../../Recoil/atoms";

const padNumber = (num: any, length: any) => {
  return String(num).padStart(length, "0");
};

const Timer = () => {
  const [time, setTime] = useRecoilState(intervalState);
  const [save, setSave] = useState({});
  const navigate = useNavigate();
  // 타이머를 초단위로 변환한 initialTime과 setInterval을 저장할 interval ref
  // useRef는 값이 변화하더라도 리랜더링을 발생시키지 않아 useEffect를 호출하지 않는다.
  const initialTime = useRef<any>(time.min * 60 + time.sec);
  const interval = useRef<any>(null);

  const [intervalSet, setIntervalSet] = useState<number>(time.interval);
  const [min, setMin] = useState(padNumber(time.min, 2));
  const [sec, setSec] = useState(padNumber(time.sec, 2));

  const [isStart, setIsStart] = useState(false);

  const onStopClick = () => {
    if (initialTime.current === 0) return;
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
    if (isStart) {
      interval.current = setInterval(() => {
        if (0 < initialTime.current) {
          initialTime.current -= 1;
          setSec(padNumber(initialTime.current % 60, 2));
          setMin(padNumber(parseInt((initialTime.current / 60) as any), 2));
        } else if (1 < intervalSet) {
          clearInterval(interval.current);
          setIntervalSet((prev: number) => prev - 1);
          initialTime.current = time.min * 60 + time.sec;
          setMin(padNumber(time.min, 2));
          setSec(padNumber(time.sec, 2));
          setIsStart(false);
        }
        if (intervalSet <= 1 && 0 === initialTime.current) {
          clearInterval(interval.current);
          setIntervalSet(0);
        }
      }, 1000);
    }
    //clean up 함수
    return () => clearInterval(interval.current);
  }, [isStart]);

  return (
    <Overlay>
      <Container>
        <div>{intervalSet}SET</div>
        <CountText>
          {min}
          <span>:</span>
          {sec}
        </CountText>
        <button onClick={onStartClick}>start</button>
        <button onClick={onStopClick}>stop</button>
        <button onClick={onBackClick}>back</button>
      </Container>
    </Overlay>
  );
};

export default Timer;

const Overlay = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(black, 80%, #0002ff);
  z-index: 100;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  padding-top: 30px;
  max-width: 375px;
  margin: 0 auto;
  color: white;
  button {
    height: 30px;
    margin-bottom: 10px;
    cursor: pointer;
  }
`;

export const CountText = styled.div`
  display: flex;
  font-family: "Roboto";
  font-weight: 900;
  font-size: 80px;
  letter-spacing: -3px;
`;
