import React, { useState, useRef, useEffect, useCallback } from "react";
import { IoPlaySharp, IoStopSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dbService } from "../../../../firebase";
import { ReactComponent as PauseIcon } from "../../../../Assets/Icons/pause.svg";
import { counterState, readyState, timeState } from "../../../../Recoil/atoms";

function BreakCounter({ useCounter }: any) {
  const navigate = useNavigate();
  const [readyToDo, setReadyToDo] = useRecoilState(readyState);
  const [counterStatus, setCounterStatus] = useRecoilState<any>(counterState);
  const [time, setTime] = useRecoilState<any>(timeState);
  const [intervalSet, setIntervalSet] = useState(time.breakSet);
  const [minutes, setMinutes] = useState(0);
  const [secounds, setSecounds] = useState(0);
  const [mSecounds, setMSecounds] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const { count, start, stop, reset, done } = useCounter(
    time.breakMin,
    time.breakSec,
    time.breakMSec
  );

  const timer = () => {
    const mathMin = Math.floor(count / 60 / 100);
    const mathSec = Math.floor((count - mathMin * 60 * 100) / 100);
    setMinutes(mathMin);
    setSecounds(mathSec);
    setMSecounds(Math.floor(count - (mathSec * 100 + mathMin * 60 * 100)));
    if (intervalSet <= 1 && count <= 0) {
      done();
      setIntervalSet(0);
      setCounterStatus(false);
      dbService
        .collection("plan")
        .doc(`${readyToDo.readyId}`)
        .collection("timer")
        .doc("time")
        .update({
          breakSet: 0,
          breakMin: time.setBreakMin,
          breakSec: time.setBreakSec,
        })
        .then(() => {
          setTime({
            ...time,
            breakSet: 0,
            breakMin: time.setBreakMin,
            breakSec: time.setBreakSec,
          });
        });
    }
    if (count <= 0 && 1 < intervalSet) {
      dbService
        .collection("plan")
        .doc(`${readyToDo.readyId}`)
        .collection("timer")
        .doc("time")
        .update({
          breakSet: time.breakSet - 1,
          breakMin: time.setBreakMin,
          breakSec: time.setBreakSec,
        })
        .then(() => {
          reset();
          setIntervalSet((prev: number) => prev - 1);
          setCounterStatus(false);
          setTime({
            ...time,
            breakSet: time.breakSet - 1,
            breakMin: time.setBreakMin,
            breakSec: time.setBreakSec,
          });
        });
    }
  };

  useEffect(timer, [count]);

  useEffect(() => {
    if (!isDone) {
      start();
      setIsDone(true);
    }
  }, []);

  const onStartClick = () => {
    if (!isDone) {
      start();
      setIsDone(true);
    }
  };

  const onStopClick = () => {
    stop();
    setIsDone(false);
  };

  const onBackClick = () => {
    navigate(`/`);
    setCounterStatus(false);
  };

  return (
    <Container>
      <TextBox>
        <TextItem>
          <span>{intervalSet}</span>SET
        </TextItem>
        <TextItem>BREAK</TextItem>
      </TextBox>
      <SetBox>
        <h4>다음 세트 까지</h4>
        <CountBox>
          <CountText>{minutes < 10 ? `0${minutes}` : minutes}</CountText>
          <CountText>:</CountText>
          <CountText>{secounds < 10 ? `0${secounds}` : secounds}</CountText>
          {/* <CountText>:</CountText>
          <CountText>{mSecounds < 10 ? `0${mSecounds}` : mSecounds}</CountText> */}
        </CountBox>
      </SetBox>
      {isDone ? (
        <BtnContainer>
          <PlayBtnBox isWhite={false} onClick={onStopClick}>
            <PauseBtn />
          </PlayBtnBox>
        </BtnContainer>
      ) : (
        <BtnContainer>
          <PlayBtnBox isWhite={true} onClick={onBackClick}>
            <DoneBtn />
          </PlayBtnBox>
          <PlayBtnBox isWhite={false} onClick={onStartClick}>
            <PlayBtn />
          </PlayBtnBox>
        </BtnContainer>
      )}
    </Container>
  );
}

export default React.memo(BreakCounter);

const Container = styled.div`
  position: relative;
  align-items: center;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 35px;
`;

const CountBox = styled.div`
  display: flex;
  align-items: flex-end;
`;

const CountText = styled.div`
  display: flex;
  font-family: "Roboto";
  font-weight: 900;
  font-size: 55px;
  &:nth-child(2) {
    margin-bottom: 5px;
    font-size: 50px;
    padding-left: 2px;
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

const TextItem = styled.div`
  font-family: "Roboto";
  font-weight: 900;
  font-size: 65px;
  margin-bottom: 10px;
  span {
    margin-right: 3px;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
`;

const SetBox = styled.div`
  h4 {
    font-family: "NotoSansKRThin";
    text-align: center;
    letter-spacing: -1px;
    font-size: 17px;
    font-weight: 100;
    margin-bottom: 15px;
  }
`;
