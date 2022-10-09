import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { counterState, timeState } from "../../../../Recoil/atoms";
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
  const [counterStatus, setCounterStatus] = useRecoilState<any>(counterState);

  return (
    <>
      {!counterStatus && <IntervalCounter useCounter={useCounter} />}
      {counterStatus && <BreakTimer useCounter={useCounter} />}
    </>
  );
}

export default React.memo(Counter);
