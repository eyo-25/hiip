import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { timeState } from "../../../../Recoil/atoms";

function Progress() {
  const [time, setTime] = useRecoilState<any>(timeState);
  const [percent, setPercent] = useState<number>(0);

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

  useEffect(() => {
    setPercent(totalPercent2);
  }, [time]);

  return (
    <TimerBarBox>
      <ProgressBar totalWidth={percent + "%"} />
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

export default React.memo(Progress);

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

const ProgressBar = styled.div<{ totalWidth: any }>`
  position: absolute;
  top: 0;
  display: flex;
  width: ${(props) => props.totalWidth};
  height: 5px;
  background-color: #0002ff;
`;
