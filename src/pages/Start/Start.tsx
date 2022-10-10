import styled from "styled-components";
import Background from "../../Assets/image/start_background2.png";
import WeeklyPickerHeader from "./Start/Component/WeeklyPickerHeader";
import { IoPlaySharp } from "react-icons/io5";
import SummaryBox from "./Start/Component/SummaryBox";
import StartBoard from "./Start/Component/StartBoard";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { readyState, timeState, toDoState } from "../../Recoil/atoms";
import React, { useEffect } from "react";
import { onSnapshot, query } from "firebase/firestore";
import { authService, dbService } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ReactComponent as PlusIcon } from "../../Assets/Icons/plus.svg";

const Start = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [readyToDo, setReadyToDo] = useRecoilState(readyState);
  const [time, setTime] = useRecoilState<any>(timeState);
  const navigate = useNavigate();
  const readyMatch = useMatch("/start/ready");
  const uid = JSON.parse(localStorage.getItem("user") as any).uid;

  useEffect(() => {
    const q = query(
      dbService
        .collection("plan")
        .where("creatorId", "==", uid)
        .orderBy("index", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setToDos(() => {
        const newArray2 = newArray.map((e) => {
          e.startDate = e.startDate.toDate();
          e.endDate = e.endDate.toDate();
          return e;
        });
        return newArray2;
      });
    });
    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });
  }, []);

  const onPlayClick = () => {
    if (readyMatch) {
      if (readyToDo.status === "ready") {
        dbService
          .collection("plan")
          .doc(`${readyToDo.readyId}`)
          .collection("timer")
          .doc("time")
          .get()
          .then((result: any) => {
            setTime({
              setIntervalSet: result.data().setIntervalSet,
              setBreakSet: result.data().setBreakSet,
              min: result.data().setMin,
              sec: result.data().setSec,
              intervalSet: result.data().intervalSet,
              breakSet: result.data().breakSet,
              setMin: result.data().setMin,
              setSec: result.data().setSec,
              breakMin: result.data().setBreakMin,
              breakSec: result.data().setBreakSec,
              setBreakMin: result.data().setBreakMin,
              setBreakSec: result.data().setBreakSec,
            });
            navigate("/timer");
          });
        dbService
          .collection("plan")
          .doc(`${readyToDo.readyId}`)
          .update({ status: "start" });
        dbService.collection("ready").doc(uid).update({ status: "start" });
      } else {
        dbService
          .collection("plan")
          .doc(`${readyToDo.readyId}`)
          .collection("timer")
          .doc("time")
          .get()
          .then((result: any) => {
            setTime({
              setIntervalSet: result.data().setIntervalSet,
              setBreakSet: result.data().setBreakSet,
              intervalSet: result.data().intervalSet,
              breakSet:
                result.data().intervalSet === result.data().breakSet
                  ? result.data().breakSet - 1 === 0
                    ? 0
                    : result.data().breakSet - 1
                  : result.data().breakSet,
              min: result.data().min,
              sec: result.data().sec,
              breakMin: result.data().breakMin,
              // result.data().breakSet - 1 === 0 ? 0 : result.data().breakMin,
              breakSec: result.data().breakSec,
              // result.data().breakSet - 1 === 0 ? 0 : result.data().breakSec,
              setMin: result.data().setMin,
              setSec: result.data().setSec,
              setBreakMin: result.data().setBreakMin,
              setBreakSec: result.data().setBreakSec,
            });
            if (result.data().intervalSet === result.data().breakSet) {
              dbService
                .collection("plan")
                .doc(`${readyToDo.readyId}`)
                .collection("timer")
                .doc("time")
                .update({
                  breakSet: result.data().intervalSet - 1,
                  breakMin:
                    result.data().breakSet - 1 === 0
                      ? 0
                      : result.data().breakMin,
                  breakSec:
                    result.data().breakSet - 1 === 0
                      ? 0
                      : result.data().breakSec,
                })
                .then(() => {
                  navigate("/timer");
                });
            } else {
              navigate("/timer");
            }
            navigate("/timer");
          });
      }
    } else {
      if (0 < toDos.length) {
        navigate("/start/ready");
      } else {
        navigate("/plan");
      }
    }
  };
  const onBackClick = () => {
    if (readyMatch !== null) {
      navigate("/start");
    }
  };

  return (
    <Wrapper>
      <BackgroundBox onClick={onBackClick}>
        <BackgroundImg isReady={readyMatch !== null} />
      </BackgroundBox>
      <Container>
        <WeeklyPickerHeader />
        <SummaryBox />
        <StartBoard />
      </Container>
      <PlayBtnBox onClick={onPlayClick}>
        {toDos.length <= 0 ? <PlusBtn /> : <PlayBtn />}
      </PlayBtnBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  background-color: black;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BackgroundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
`;

const BackgroundImg = styled.div<{ isReady: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-image: ${(props) =>
      props.isReady
        ? "linear-gradient(rgba(0, 0, 0, 0.5), 40%, rgba(0, 0, 0, 1)),"
        : "linear-gradient(rgba(0, 0, 0, 0), 40%, rgba(0, 0, 0, 0.4)),"}
    url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 65%;
`;

const PlayBtnBox = styled.button`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  width: 78px;
  border-radius: 50%;
  border: none;
  margin: 0 auto;
  background-color: black;
  cursor: pointer;
`;

const PlayBtn = styled(IoPlaySharp)`
  color: white;
  padding-left: 4px;
  width: 35px;
  height: 35px;
`;

const PlusBtn = styled(PlusIcon)`
  color: white;
  width: 30px;
  height: 30px;
`;

export default React.memo(Start);
