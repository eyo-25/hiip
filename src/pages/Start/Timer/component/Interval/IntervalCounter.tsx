import React, { useState, useRef, useEffect, useCallback } from "react";
import { IoPlaySharp, IoStopSharp } from "react-icons/io5";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dbService } from "../../../../../firebase";
import {
  counterState,
  isStartState,
  readyState,
  timeState,
  toDoState,
} from "../../../../../Recoil/atoms";
import { ReactComponent as PauseIcon } from "../../../../../Assets/Icons/pause.svg";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import IntervalPause from "./IntervalPause";
import IntervalStart from "./IntervalStart";

function IntervalCounter({ useCounter }: any) {
  const navigate = useNavigate();
  const [toDos, setToDos] = useRecoilState(toDoState);
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
  const [isStart, setIsStart] = useRecoilState(isStartState);
  const [iswhite, setIswhite] = useState(false);

  const timer = () => {
    const uid = JSON.parse(localStorage.getItem("user") as any).uid;
    if (intervalSet === 0) {
      navigate("/result");
    }
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
      dbService.collection("plan").doc(`${readyToDo.readyId}`).update({
        index: 0,
        status: "done",
      });
      dbService.collection("plan").doc(`${toDos[1].id}`).update({
        index: 999999999,
      });
      const readyObj = {
        readyId: toDos[1].id,
        status: toDos[1].status,
      };
      dbService
        .collection("ready")
        .doc(uid)
        .set(readyObj)
        .then(() => {
          setReadyToDo(readyObj);
        });
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
        })
        .then(() => {
          navigate("/result");
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
          setIsStart(false);
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
      setIsStart(true);
      setTimeout(() => {
        start();
      }, 500);
    }
    //클린업펑션(언마운트시 실행)
    return () => {
      setIsStart(false);
    };
  }, []);

  const onStartClick = () => {
    if (!isStart) {
      setTimeout(() => {
        start();
        setIsStart(true);
      });
    }
  };

  const onStopClick = () => {
    stop();
    setIsStart(false);
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
      {isStart ? (
        <IntervalStart
          secounds={secounds}
          minutes={minutes}
          id={readyToDo.readyId}
        />
      ) : (
        <IntervalPause
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

export default React.memo(IntervalCounter);

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 15px;
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

const PlayBtnBox = styled(motion.div)<{ iswhite: any }>`
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
