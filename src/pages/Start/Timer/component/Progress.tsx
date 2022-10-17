import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { timeState } from "../../../../Recoil/atoms";
import { IoTriangleSharp } from "react-icons/io5";
import { motion } from "framer-motion";

function Progress() {
  const [time, setTime] = useRecoilState<any>(timeState);

  //progress바 연산

  // 총 세트 수
  let totalSet = time.setIntervalSet + time.setBreakSet;

  //setinterval 한세트의 총시간
  let setCount = time.setMin * 60 * 100 + time.setSec * 100;
  //setbreak 총시간
  let setBreakCount =
    time.setBreakMin * 60 * 100 + (time.setBreakSec + 1) * 100;
  //진행바 한 세트의 총시간
  let totalCount = setCount + setBreakCount;

  //진행바 모든세트의 총시간
  let totalSetCount =
    setCount * time.setIntervalSet + setBreakCount * time.setBreakSet;

  // //진행바 한 인터벌의 퍼센티지(한세트에는 100%)
  let oneIntervalPercentage =
    totalSet === 1 ? 100 : Math.floor((setCount / totalCount) * 100);
  //진행바 한 브레이크의 퍼센티지
  let oneBreakPercentage = Math.ceil((setBreakCount / totalCount) * 100);

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

  let barArray: any[] = [{}];

  for (let i = 0; i < totalSet - 1; i++) {
    barArray.push((barArray[i] = {}));
  }

  let marginSum = 0;

  const [percentArray, setPercentArray] = useState<any>([]);
  const [marginArray, setMarginArray] = useState<any>([]);

  useEffect(() => {
    setPercentArray((prev: any) => {
      let copy = [...prev];
      for (let i = 0; i < totalSet - 1; i++) {
        copy[i] = 0;
      }
      return copy;
    });

    setMarginArray((prev: any) => {
      let copy = [...prev];
      for (let i = 0; i < totalSet - 1; i++) {
        copy[i] = 0;
      }
      return copy;
    });
  }, []);

  useEffect(() => {
    setPercentArray((array: any) => {
      let copy = [...array];
      barArray.map((data, index) => {
        if (index % 2 === 0 && index === nowSetStep) {
          copy.splice(index, 1, nowIntervalPercent);
        }
        if (index % 2 === 0 && index < nowSetStep) {
          copy.splice(index, 1, 100);
        }
        if (index % 2 === 0 && nowSetStep < index) {
          copy.splice(index, 1, 0);
        }

        if (index % 2 === 1 && index === nowSetStep) {
          copy.splice(index, 1, nowBreakPercent);
        }
        if (index % 2 === 1 && index < nowSetStep) {
          copy.splice(index, 1, 100);
        }
        if (index % 2 === 1 && nowSetStep < index) {
          copy.splice(index, 1, 0);
        }
      });
      return copy;
    });
  }, [time]);

  useEffect(() => {
    setMarginArray((array: any) => {
      let copy = [...array];
      barArray.map((data, i) => {
        if (i % 2 === 0) {
          copy.splice(i, 1, percentArray[i] * (setCount / totalSetCount));
        }
        if (i % 2 === 1) {
          copy.splice(i, 1, percentArray[i] * (setBreakCount / totalSetCount));
        }
      });
      return copy;
    });
  }, [time, percentArray]);

  if (1 <= marginArray.length) {
    marginSum = marginArray.reduce((a: any, b: any) => a + b);
  }

  return (
    <Container variants={OnVarients} initial="start" animate="end">
      <ProgressPin style={{ marginLeft: `${marginSum}%` }} />
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
                style={{ width: `${percentArray[index]}%` }}
              />
            </ProgressBar>
          );
        })}
      </TimerBarBox>
      <FeedBackBox>
        <FeedBackText>나중에 울지말고 지금 울면서해라</FeedBackText>
      </FeedBackBox>
    </Container>
  );
}

export default React.memo(Progress);

const Container = styled(motion.div)`
  position: fixed;
  padding-top: 15px;
  margin-top: 200px;
  width: 230px;
  display: flex;
  flex-direction: column;
`;

const ProgressPin = styled(IoTriangleSharp)`
  position: absolute;
  top: 2px;
  left: -5px;
  display: flex;
  width: 10px;
  height: 10px;
  color: #fb0045;
  transform: rotate(180deg);
`;

const TimerBarBox = styled.div`
  display: flex;
  margin-bottom: 25px;
  height: 7px;
`;

const ProgressPercent = styled.div<{ isInterval: boolean }>`
  position: relative;
  top: 0;
  display: flex;
  height: 5px;
  background-color: ${(props) => (props.isInterval ? "#fb0045" : "#0002ff")};
`;

const ProgressBar = styled.div<{
  width: number;
  isBlack: boolean;
}>`
  position: relative;
  display: flex;
  background-color: ${(props) => (props.isBlack ? "inherit" : "white")};
  width: ${(props) => props.width}%;
  height: 5px;
`;

const FeedBackBox = styled.div`
  display: flex;
  margin-bottom: 60px;
`;

const FeedBackText = styled.h4`
  font-size: 14px;
  margin: 0 auto;
  letter-spacing: -1px;
  color: white;
`;

const OnVarients = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};
