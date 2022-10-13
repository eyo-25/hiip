import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { timeState } from "../../../../Recoil/atoms";
import { IoCaretDownSharp } from "react-icons/io5";

function Progress() {
  const [time, setTime] = useRecoilState<any>(timeState);

  //progress바 연산

  // 총 세트 수
  let totalSet = time.setIntervalSet + time.setBreakSet - 1;

  //setinterval 총시간
  let setCount = time.setMin * 60 * 100 + time.setSec * 100;
  //setbreak 총시간
  let setBreakCount = time.setBreakMin * 60 * 100 + time.setBreakSec * 100;

  //진행바 한 세트의 퍼센티지
  let oneSetPercentage = Math.floor((setCount + setBreakCount) / 100);
  //진행바 한 인터벌의 퍼센티지
  let oneIntervalPercentage = Math.floor(setCount / oneSetPercentage);
  //진행바 한 브레이크의 퍼센티지
  let oneBreakPercentage = Math.ceil(setBreakCount / oneSetPercentage);

  //진행바 인터벌 현재의 퍼센티지
  let nowIntervalPercent =
    ((setCount - (time.min * 60 * 100 + time.sec * 100 + time.mSec)) /
      setCount) *
    100;

  //진행바 브레이크 현재의 퍼센티지
  let nowBreakPercent =
    ((setBreakCount -
      (time.breakMin * 60 * 100 + time.breakSec * 100 + time.breakMSec)) /
      setBreakCount) *
    100;

  //진행바 현재의 세트의 단계
  let nowSetStep =
    time.setIntervalSet - time.intervalSet + (time.setBreakSet - time.breakSet);

  let barArray: any[] = [];

  for (let i = 0; i < totalSet; i++) {
    barArray.push(
      (barArray[i] = {
        if() {},
      })
    );
  }

  let percentArray: number[] = [];

  let marginArray: number[] = [];

  useEffect(() => {
    for (let i = 0; i < totalSet; i++) {
      percentArray.push((percentArray[i] = 0));
    }
  }, []);

  let marginSum = 0;

  barArray.map((data, index) => {
    if (index % 2 === 0 && index === nowSetStep) {
      percentArray.splice(index, 1, nowIntervalPercent);
    }
    if (index % 2 === 0 && index < nowSetStep) {
      percentArray.splice(index, 1, 100);
    }
    if (index % 2 === 0 && nowSetStep < index) {
      percentArray.splice(index, 1, 0);
    }

    if (index % 2 === 1 && index === nowSetStep) {
      percentArray.splice(index, 1, nowBreakPercent);
    }
    if (index % 2 === 1 && index < nowSetStep) {
      percentArray.splice(index, 1, 100);
    }
    if (index % 2 === 1 && nowSetStep < index) {
      percentArray.splice(index, 1, 0);
    }
  });

  for (let i = 0; i < percentArray.length - 1; i++) {
    if (i % 2 === 0) {
      marginArray.push(
        (marginArray[i] = percentArray[i] * (oneIntervalPercentage / 266))
      );
    }
    if (i % 2 === 1) {
      marginArray.push(
        (marginArray[i] = percentArray[i] * (oneBreakPercentage / 266))
      );
    }
    marginSum = marginArray.reduce((a, b) => a + b);
  }

  console.log(oneBreakPercentage);

  return (
    <Container>
      <ProgressPin marginLeft={marginSum} />
      <TimerBarBox>
        {barArray.map((data, index) => {
          return (
            <ProgressBar
              width={
                (index + 1) % 2 === 0
                  ? oneBreakPercentage
                  : oneIntervalPercentage
              }
              isBlack={index % 2 === 0 ? false : true}
              key={index}
            >
              <ProgressPercent
                isInterval={index % 2 === 0 ? false : true}
                width={percentArray[index]}
              />
            </ProgressBar>
          );
        })}
      </TimerBarBox>
    </Container>
  );
}

export default React.memo(Progress);

const Container = styled.div`
  position: relative;
  padding-top: 15px;
  margin-top: 220px;
  width: 230px;
  display: flex;
  flex-direction: column;
`;

const ProgressPin = styled(IoCaretDownSharp)<{ marginLeft: number }>`
  position: absolute;
  top: 0;
  left: -7.5px;
  margin-left: ${(props) => props.marginLeft}%;
  display: flex;
  width: 15px;
  height: 15px;
  color: #fb0045;
`;

const TimerBarBox = styled.div`
  display: flex;
  margin-bottom: 25px;
  height: 7px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ width: number; isBlack: boolean }>`
  position: relative;
  display: flex;
  background-color: ${(props) => (props.isBlack ? "inherit" : "white")};
  width: ${(props) => props.width}%;
  height: 5px;
`;

const ProgressPercent = styled.div<{ isInterval: boolean; width: number }>`
  position: absolute;
  top: 0;
  display: flex;
  width: ${(props) => props.width}%;
  height: 5px;
  background-color: ${(props) => (props.isInterval ? "#fb0045" : "#0002ff")};
`;
