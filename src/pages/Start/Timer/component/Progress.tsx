import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { timeState } from "../../../../Recoil/atoms";

function Progress() {
  const [time, setTime] = useRecoilState<any>(timeState);
  const [percent, setPercent] = useState<number>(0);

  let barArray: any[] = [];

  console.log(time);

  for (let i = 0; i < time.setIntervalSet + time.setBreakSet - 1; i++) {
    barArray.push(
      (barArray[i] = {
        if() {},
      })
    );
  }

  //progress바 연산

  //setinterval시간합
  let setCount = time.setMin * 60 * 100 + time.setSec * 100;
  //setbreak시간합
  let setBreakCount = time.setBreakMin * 60 * 100 + time.setBreakSec * 100;

  //진행바 한 세트의 퍼센티지
  let oneSetPercentage = Math.floor((setCount + setBreakCount) / 100);
  //진행바 한 인터벌의 퍼센티지
  let oneIntervalPercentage = Math.floor(setCount / oneSetPercentage);
  //진행바 한 브레이크의 퍼센티지
  let oneBreakPercentage = Math.ceil(setBreakCount / oneSetPercentage);

  // let totalTime =
  //   setCount * time.setIntervalSet + setBreakCount * time.setBreakSet;

  // let nowCount = time.min * 60 * 100 + time.sec * 100;
  // let nowBreakCount = time.breakMin * 60 * 100 + time.breakSec * 100;

  // let nowSet = time.setIntervalSet - time.intervalSet;

  // let nowBreakSet = time.setBreakSet - time.breakSet;

  // let totalNowTime =
  //   setCount -
  //   nowCount +
  //   nowSet * setCount +
  //   (setBreakCount - nowBreakCount) +
  //   nowBreakSet * setBreakCount;

  // let totalPercent = (totalNowTime / totalTime) * 100;

  // let totalPercent2 = 100 < totalPercent ? 100 : totalPercent;

  useEffect(() => {
    // setPercent(totalPercent2);
  }, [time]);

  // let breakBarWidth =
  //   Math.floor((setBreakCount / totalTime) * 100) / time.setIntervalSet;

  console.log(time);

  return (
    <TimerBarBox>
      {barArray.map((data, index) => {
        return (
          <ProgressBar
            width={
              (index + 1) % 2 === 0 ? oneBreakPercentage : oneIntervalPercentage
            }
            key={index}
          >
            <ProgressPercent
              isInterval={(index + 1) % 2 === 0 ? false : true}
            />
          </ProgressBar>
        );
      })}
    </TimerBarBox>
  );
}

export default React.memo(Progress);

const TimerBarBox = styled.div`
  display: flex;
  margin-top: 220px;
  margin-bottom: 25px;
  width: 230px;
  height: 7px;
  background-color: white;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ width: number }>`
  position: relative;
  width: ${(props) => props.width}%;
  height: 5px;
`;

const ProgressPercent = styled.div<{ isInterval: boolean }>`
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  height: 5px;
  background-color: ${(props) => (props.isInterval ? "#0002ff" : "#fb0045")};
`;
