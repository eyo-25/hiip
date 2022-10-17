import React, { useState, useRef, useEffect, useCallback } from "react";
import { IoPlaySharp, IoStopSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dbService } from "../../../../../firebase";
import { ReactComponent as PauseIcon } from "../../../../../Assets/Icons/pause.svg";
import {
  counterState,
  isStartState,
  readyState,
  timeState,
} from "../../../../../Recoil/atoms";
import BreakPause from "./BreakPause";
import BreakStart from "./BreakStart";
import { AnimatePresence, motion } from "framer-motion";

function BreakCounter({ useCounter }: any) {
  const navigate = useNavigate();
  const [readyToDo, setReadyToDo] = useRecoilState(readyState);
  const [counterStatus, setCounterStatus] = useRecoilState<any>(counterState);
  const [time, setTime] = useRecoilState<any>(timeState);
  const [intervalSet, setIntervalSet] = useState(time.breakSet);
  const [minutes, setMinutes] = useState(0);
  const [secounds, setSecounds] = useState(0);
  const [mSecounds, setMSecounds] = useState(0);
  const [isStart, setStart] = useRecoilState(isStartState);
  const [iswhite, setIswhite] = useState(false);
  const { count, start, stop, reset, done } = useCounter(
    time.breakMin,
    time.breakSec,
    time.breakMSec
  );

  const timer = () => {
    if (intervalSet !== 0) {
      const mathMin = Math.floor(count / 60 / 100);
      const mathSec = Math.floor((count - mathMin * 60 * 100) / 100);
      setMinutes(mathMin);
      setSecounds(mathSec);
      setMSecounds(Math.floor(count - (mathSec * 100 + mathMin * 60 * 100)));
      setTime({
        ...time,
        breakMin: mathMin,
        breakSec: mathSec,
        breakMSec: Math.floor(count - (mathSec * 100 + mathMin * 60 * 100)),
      });
    }
    if (intervalSet <= 1 && count <= 0) {
      done();
      setIntervalSet(0);
      setCounterStatus(false);
      setStart(false);
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
            breakMSec: 0,
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
          setStart(false);
          setTime({
            ...time,
            breakSet: time.breakSet - 1,
            breakMin: time.setBreakMin,
            breakSec: time.setBreakSec,
            breakMSec: 0,
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
  };

  const onBackClick = () => {
    navigate(`/`);
    setCounterStatus(false);
  };

  return (
    <Container>
      {isStart ? (
        <BreakStart
          secounds={secounds}
          minutes={minutes}
          id={readyToDo.readyId}
          intervalset={time.intervalSet}
        />
      ) : (
        <BreakPause
          secounds={secounds}
          minutes={minutes}
          id={readyToDo.readyId}
        />
      )}
      <BtnContainer>
        {isStart ? (
          <>
            <PlayBtnBox iswhite={iswhite} onClick={onStopClick}>
              <PauseBtn />
            </PlayBtnBox>
          </>
        ) : (
          <>
            <AnimatePresence>
              <DoneBtnBox
                variants={DoneBtnVarients}
                initial="start"
                animate="end"
                exit="exit"
                onClick={onBackClick}
              >
                <DoneBtn />
              </DoneBtnBox>
            </AnimatePresence>
            <AnimatePresence>
              <StartBtnBox
                variants={StartBtnVarients}
                initial="start"
                animate="end"
                exit="exit"
                iswhite={iswhite}
                onClick={onStartClick}
              >
                <PlayBtn />
              </StartBtnBox>
            </AnimatePresence>
          </>
        )}
      </BtnContainer>
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
`;

const BtnContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 196px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 375px;
  margin: 0 auto;
`;

const PlayBtnBox = styled(motion.div)<{ iswhite: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  width: 78px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => (props.iswhite ? "white" : "black")};
  cursor: pointer;
`;

const DoneBtnBox = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  width: 78px;
  border-radius: 50%;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const StartBtnBox = styled(motion.div)<{ iswhite: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  width: 78px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => (props.iswhite ? "white" : "black")};
  cursor: pointer;
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

const DoneBtnVarients = {
  start: {
    opacity: 0,
    x: 0,
  },
  end: {
    opacity: 1,
    x: -80,
    transition: {
      duration: 0.3,
      type: "linear",
    },
  },
  exit: {
    x: +80,
    transition: {
      duration: 1,
      type: "linear",
    },
  },
};

const StartBtnVarients = {
  start: {
    x: 0,
  },
  end: {
    x: 80,
    transition: {
      duration: 0.3,
      type: "ease",
    },
  },
  exit: {
    x: -80,
    transition: {
      duration: 1,
      type: "ease",
    },
  },
};
