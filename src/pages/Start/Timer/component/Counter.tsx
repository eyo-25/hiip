import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { counterState, timeState } from "../../../../Recoil/atoms";
import IntervalCounter from "./Interval/IntervalCounter";
import BreakCounter from "./Break/BreakCounter";
import Progress from "./Progress";

const useCounter = (setMin: any, setSec: any, mSec: any) => {
  const countRef = useRef<any>(setMin * 60 * 100 + setSec * 100 + mSec);
  const [count, setCount] = useState(setMin * 60 * 100 + setSec * 100 + mSec);
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
    }, 10);
  }, []);
  const stop = useCallback(() => {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
  }, []);
  const reset = useCallback(() => {
    countRef.current = setMin * 60 * 100 + setSec * 100 + mSec;
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
  const [counterStatus, setCounterStatus] = useRecoilState<any>(counterState);

  return (
    <>
      {!counterStatus && <IntervalCounter useCounter={useCounter} />}
      {counterStatus && <BreakCounter useCounter={useCounter} />}
    </>
  );
}

export default React.memo(Counter);
