import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dbService } from "../../../../firebase";
import {
  counterState,
  readyState,
  timeSaveState,
  timeState,
} from "../../../../Recoil/atoms";

export function BreakTimer({ useCounter }: any) {
  const [readyToDo, setReadyToDo] = useRecoilState(readyState);
  const [counterStatus, setCounterStatus] = useRecoilState<any>(counterState);
  const [time, setTime] = useRecoilState<any>(timeState);
  const [timeSave, setTimeSave] = useRecoilState<any>(timeSaveState);
  const [intervalSet, setIntervalSet] = useState(time.breakSet);
  const [minutes, setMinutes] = useState(0);
  const [secounds, setSecounds] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const { count, start, stop, reset, done } = useCounter(
    time.breakMin,
    time.breakSec
  );

  const timer = () => {
    setMinutes(Math.floor(count / 60));
    setSecounds(count - Math.floor(count / 60) * 60);
    if (intervalSet <= 1 && count <= 0) {
      done();
      setIntervalSet(0);
      setCounterStatus((prev: boolean) => !prev);
      dbService.collection("time").doc(`${readyToDo.readyId}`).update({
        breakSet: 0,
        breakMin: 0,
        breakSec: 0,
      });
    } else if (secounds !== 0) {
      dbService.collection("time").doc(`${readyToDo.readyId}`).update({
        breakMin: minutes,
        breakSec: secounds,
      });
    }
    if (count <= 0 && 1 < intervalSet) {
      reset();
      setIntervalSet((prev: number) => prev - 1);
      setCounterStatus((prev: boolean) => !prev);
      setTime({
        ...time,
        breakSet: time.breakSet - 1,
        breakMin: timeSave.breakMin,
        breakSec: timeSave.breakSec,
      });

      dbService
        .collection("time")
        .doc(`${readyToDo.readyId}`)
        .update({
          breakSet: time.breakSet - 1,
          breakMin: timeSave.breakMin,
          breakSec: timeSave.breakSec,
        });
    }
  };

  useEffect(timer, [count]);

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

  return (
    <>
      <h1>break timer</h1>
      <CountBox>
        <CountText>{minutes < 10 ? `0${minutes}` : minutes}</CountText>
        <CountText>:</CountText>
        <CountText>{secounds < 10 ? `0${secounds}` : secounds}</CountText>
      </CountBox>
      <h1>{intervalSet}Set</h1>
      <button onClick={onStartClick}>시작</button>
      <button onClick={onStopClick}>정지</button>
    </>
  );
}

export const CountBox = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const CountText = styled.div`
  display: flex;
  font-family: "Roboto";
  font-weight: 900;
  font-size: 80px;
  letter-spacing: -3px;
  &:nth-child(2) {
    margin-bottom: 8px;
    font-size: 70px;
  }
`;
