import React, { useState, useRef, useEffect, useCallback } from "react";
import { IoPlaySharp, IoStopSharp } from "react-icons/io5";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dbService } from "../../../../firebase";
import {
  counterState,
  isStartState,
  readyState,
  timeState,
} from "../../../../Recoil/atoms";
import { ReactComponent as PauseIcon } from "../../../../Assets/Icons/pause.svg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function IntervalCounter({ useCounter }: any) {
  const navigate = useNavigate();
  const [readyToDo, setReadyToDo] = useRecoilState(readyState);
  const [counterStatus, setCounterStatus] = useRecoilState<any>(counterState);
  const [time, setTime] = useRecoilState<any>(timeState);
  const [intervalSet, setIntervalSet] = useState(time.intervalSet);
  const { count, start, stop, reset, done } = useCounter(
    time.min,
    time.sec,
    time.mSec
  );
  const [minutes, setMinutes] = useState(0);
  const [secounds, setSecounds] = useState(0);
  const [mSecounds, setMSecounds] = useState(0);
  const [isStart, setStart] = useRecoilState(isStartState);

  const timer = () => {
    if (intervalSet === 0) return;
    if (intervalSet !== 0) {
      const mathMin = Math.floor(count / 60 / 100);
      const mathSec = Math.floor((count - mathMin * 60 * 100) / 100);
      setMinutes(mathMin);
      setSecounds(mathSec);
      setMSecounds(Math.floor(count - (mathSec * 100 + mathMin * 60 * 100)));
      setTime({
        ...time,
        min: mathMin,
        sec: mathSec,
        mSec: Math.floor(count - (mathSec * 100 + mathMin * 60 * 100)),
      });
    }
    if (intervalSet <= 1 && count <= 0) {
      done();
      setIntervalSet(0);
      dbService
        .collection("plan")
        .doc(`${readyToDo.readyId}`)
        .collection("timer")
        .doc("time")
        .update({
          intervalSet: 0,
          breakSet: 0,
          min: time.setMin,
          sec: time.setSec,
          breakMin: time.setBreakMin,
          breakSec: time.setBreakSec,
        });
      setTime({
        ...time,
        intervalSet: 0,
        breakSet: 0,
        min: time.setMin,
        sec: time.setSec,
        breakMin: time.setBreakMin,
        breakSec: time.setBreakSec,
        mSec: 0,
      });
    }
    if (count <= 0 && 1 < intervalSet) {
      dbService
        .collection("plan")
        .doc(`${readyToDo.readyId}`)
        .collection("timer")
        .doc("time")
        .update({
          intervalSet: time.intervalSet - 1,
          min: time.setMin,
          sec: time.setSec,
        })
        .then(() => {
          reset();
          setIntervalSet((prev: number) => prev - 1);
          setCounterStatus(true);
          setStart(false);
          setTime({
            ...time,
            intervalSet: time.intervalSet - 1,
            min: time.setMin,
            sec: time.setSec,
            breakMin: time.setBreakMin,
            breakSec: time.setBreakSec,
            mSec: 0,
          });
        });
    }
  };

  useEffect(timer, [count]);

  useEffect(() => {
    if (!isStart) {
      start();
      setStart(true);
    }
  }, []);

  const onStartClick = () => {
    if (!isStart) {
      start();
      setStart(true);
    }
  };

  const onStopClick = () => {
    stop();
    setStart(false);
    dbService
      .collection("plan")
      .doc(`${readyToDo.readyId}`)
      .collection("timer")
      .doc("time")
      .update({
        min: minutes,
        sec: secounds,
      });
  };

  const onBackClick = () => {
    navigate(`/`);
  };

  return (
    <Container>
      {!isStart && (
        <>
          <PauseText>PAUSE</PauseText>
          <GuideText>다음 휴식까지</GuideText>
        </>
      )}
      <CountBox isStart={isStart}>
        <CountText>{minutes < 10 ? `0${minutes}` : minutes}</CountText>
        <CountText>:</CountText>
        <CountText>{secounds < 10 ? `0${secounds}` : secounds}</CountText>
        {/* <CountText>:</CountText>
        <CountText>{mSecounds < 10 ? `0${mSecounds}` : mSecounds}</CountText> */}
      </CountBox>

      {isStart ? (
        <BtnContainer>
          <PlayBtnBox isWhite={false} onClick={onStopClick}>
            <PauseBtn />
          </PlayBtnBox>
        </BtnContainer>
      ) : (
        <>
          <GuideText>
            진행된 <span>SET</span>
          </GuideText>
          <SetText>{time.setIntervalSet - time.intervalSet}</SetText>
          <BtnContainer>
            <PlayBtnBox isWhite={true} onClick={onBackClick}>
              <DoneBtn />
            </PlayBtnBox>
            <PlayBtnBox isWhite={false} onClick={onStartClick}>
              <PlayBtn />
            </PlayBtnBox>
          </BtnContainer>
        </>
      )}
    </Container>
  );
}

export default React.memo(IntervalCounter);

const Container = styled.div`
  position: relative;
  align-items: center;
  top: 0;
  width: 100%;
  height: 100%;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

const CountBox = styled.div<{ isStart: boolean }>`
  display: flex;
  align-items: flex-end;
  margin-bottom: 30px;
  div {
    font-weight: 900;
    font-size: ${(props) => (props.isStart ? "80" : "45")}px;
    letter-spacing: ${(props) => (props.isStart ? "-3" : "0")}px;
    &:nth-child(2) {
      margin-bottom: ${(props) => (props.isStart ? "10" : "8")}px;
      font-size: ${(props) => (props.isStart ? "70" : "40")}px;
      padding-left: ${(props) => (props.isStart ? "7" : "4")}px;
      padding-right: ${(props) => (props.isStart ? "5" : "3")}px;
    }
  }
`;

const SetText = styled.div`
  display: flex;
  font-family: "Roboto";
  font-weight: 900;
  font-size: 45px;
`;

const CountText = styled.div`
  display: flex;
  font-family: "Roboto";
`;

const PauseText = styled.h1`
  display: flex;
  font-family: "Roboto";
  font-weight: 900;
  font-size: 70px;
  letter-spacing: -1px;
  margin-bottom: 40px;
`;

const GuideText = styled.p`
  font-family: "NotoSansKRThin";
  text-align: center;
  font-weight: 100;
  margin-bottom: 5px;
  span {
    font-size: 18px;
  }
`;

const BtnContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 375px;
  margin: 0 auto;
`;

const PlayBtnBox = styled.div<{ isWhite: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  width: 78px;
  border-radius: 50%;
  border: none;
  bottom: 140px;
  background-color: ${(props) => (props.isWhite ? "white" : "black")};
  cursor: pointer;
  &:nth-child(2) {
    margin-left: 75px;
  }
`;

const PlayBtn = styled(IoPlaySharp)`
  color: white;
  padding-left: 4px;
  width: 35px;
  height: 35px;
`;

const PauseBtn = styled(PauseIcon)`
  color: white;
  width: 23px;
  height: 23px;
`;

const DoneBtn = styled(IoStopSharp)`
  color: black;
  width: 30px;
  height: 30px;
`;
