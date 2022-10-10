import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { timeState } from "../../../../Recoil/atoms";

export function Progress() {
  const [time, setTime] = useRecoilState<any>(timeState);

  let barArray: number[] = [];

  for (let i = 0; i < time.setIntervalSet - 1; i++) {
    barArray.push((barArray[i] = i));
  }

  //progress바 연산
  let setCount = time.setMin * 60 + time.setSec;
  let setBreakCount = time.setBreakMin * 60 + time.setBreakSec;
  let nowCount = time.min * 60 + time.sec;
  let nowBreakCount = time.breakMin * 60 + time.breakSec;

  let nowSet = time.setIntervalSet - time.intervalSet;

  let nowBreakSet = time.setBreakSet - time.breakSet;

  let totalTime =
    setCount * time.setIntervalSet + setBreakCount * time.setBreakSet;
  let totalNowTime =
    setCount -
    nowCount +
    nowSet * setCount +
    (setBreakCount - nowBreakCount) +
    nowBreakSet * setBreakCount;

  let totalPercent = (totalNowTime / totalTime) * 100;

  let totalPercent2 = 100 < totalPercent ? 100 : totalPercent;

  console.log(time);

  return (
    <TimerBarBox>
      <ProgressBar totalPercent={totalPercent2} />
      {barArray.map((data, index) => {
        return (
          <BarItems key={index}>
            <IntervalBar />
            <BreakBar />
          </BarItems>
        );
      })}
    </TimerBarBox>
  );
}

export default Progress;

const TimerBarBox = styled.div`
  position: relative;
  display: flex;
  margin-top: 220px;
  margin-bottom: 25px;
  width: 230px;
  height: 7px;
  background-color: white;
`;

const BarItems = styled.div`
  display: flex;
  width: 100%;
  &:last-child {
    width: 90%;
    div {
      width: 100%;
    }
    span {
      display: none;
    }
  }
`;

const IntervalBar = styled.div`
  display: flex;
  width: 100%;
`;

const BreakBar = styled.span`
  display: flex;
  z-index: 20;
  background-color: #fb0045;
  width: 5px;
`;

const ProgressBar = styled.div<{ totalPercent: number }>`
  position: absolute;
  top: 0;
  display: flex;
  width: ${(props) => props.totalPercent}%;
  height: 5px;
  background-color: #0002ff;
`;
