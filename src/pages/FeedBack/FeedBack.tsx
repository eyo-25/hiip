import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { timeState } from "../../Recoil/atoms";

const useCounter = (setMin: any, setSec: any) => {
  const countRef = useRef<any>(setMin * 60 + setSec);
  const [count, setCount] = useState(countRef.current);
  const intervalRef = useRef<any>(null);
  const start = useCallback(() => {
    intervalRef.current = setInterval(() => {
      if (intervalRef.current === null) return;
      if (0 < countRef.current) {
        countRef.current -= 1;
        setCount(countRef.current);
      } else if (countRef.current <= 0) {
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

function Timer() {
  const timeObj = { min: 0, sec: 3, interval: 3, breakMin: 0, breakSec: 1 };
  const [time, setTime] = useRecoilState<any>(timeState);
  const [intervalSet, setIntervalSet] = useState(timeObj.interval);
  const { count, start, stop, reset, done } = useCounter(
    timeObj.min,
    timeObj.sec
  );
  const [minutes, setMinutes] = useState(0);
  const [secounds, setSecounds] = useState(0);

  const timer = () => {
    setMinutes(Math.floor(count / 60));
    setSecounds(count - Math.floor(count / 60) * 60);
    setTime({ ...time, min: minutes, sec: secounds });
    if (count === 0 && 0 < intervalSet) {
      reset();
      setIntervalSet((prev) => prev - 1);
    } else if (intervalSet <= 0) {
      done();
      setTime({ ...time, min: minutes, sec: secounds });
    }
  };

  useEffect(timer, [count]);

  return (
    <>
      <h1>interval timer</h1>
      <h1>{minutes < 10 ? `0${minutes}` : minutes}</h1>
      <h1>{secounds < 10 ? `0${secounds}` : secounds}</h1>
      <h1>{intervalSet}Set</h1>
      <button onClick={start}>시작</button>
      <button onClick={stop}>정지</button>
    </>
  );
}

function BreakTimer() {
  const timeObj = { min: 0, sec: 3, interval: 3, breakMin: 0, breakSec: 5 };
  const [time, setTime] = useRecoilState<any>(timeState);
  const [intervalSet, setIntervalSet] = useState(timeObj.interval - 1);
  const { count, start, stop, reset, done } = useCounter(
    timeObj.breakMin,
    timeObj.breakSec
  );
  const [minutes, setMinutes] = useState(0);
  const [secounds, setSecounds] = useState(0);

  console.log(time);

  const timer = () => {
    setMinutes(Math.floor(count / 60));
    setSecounds(count - Math.floor(count / 60) * 60);
    setTime({ ...time, breakMin: minutes, breakSec: secounds });
    if (count === 0 && 0 < intervalSet) {
      reset();
      setIntervalSet((prev) => prev - 1);
    } else if (intervalSet <= 0) {
      done();
      setTime({ ...time, breakMin: 0, breakSec: secounds });
    }
  };

  useEffect(timer, [count]);

  return (
    <>
      <h1>break timer</h1>
      <h1>{minutes < 10 ? `0${minutes}` : minutes}</h1>
      <h1>{secounds < 10 ? `0${secounds}` : secounds}</h1>
      <h1>{intervalSet}Set</h1>
      <button onClick={start}>시작</button>
      <button onClick={stop}>정지</button>
    </>
  );
}

function FeedBack() {
  return (
    <>
      <Timer />
      <BreakTimer />
    </>
  );
}

export default React.memo(FeedBack);
