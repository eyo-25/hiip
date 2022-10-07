import styled from "styled-components";
import Background from "../../Assets/image/start_background2.png";
import WeeklyPickerHeader from "./Start/Component/WeeklyPickerHeader";
import { IoPlaySharp } from "react-icons/io5";
import SummaryBox from "./Start/Component/SummaryBox";
import StartBoard from "./Start/Component/StartBoard";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  readyState,
  timeSaveState,
  timeState,
  toDoState,
} from "../../Recoil/atoms";
import React, { useEffect } from "react";
import { onSnapshot, query } from "firebase/firestore";
import { authService, dbService } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Start = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [readyToDo, setReadyToDo] = useRecoilState(readyState);
  const [time, setTime] = useRecoilState<any>(timeState);
  const [timeSave, setTimeSave] = useRecoilState<any>(timeSaveState);
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

  console.log(timeSave);

  const onPlayClick = () => {
    dbService
      .collection("plan")
      .doc(`${readyToDo.readyId}`)
      .collection("timer")
      .doc("time")
      .get()
      .then((result: any) => {
        setTimeSave(result.data());
      });
    if (readyMatch) {
      if (readyToDo.status === "ready") {
        dbService
          .collection("plan")
          .doc(`${readyToDo.readyId}`)
          .collection("timer")
          .doc("time")
          .get()
          .then((result: any) => {
            setTime(result.data());
            setReadyToDo((data: any) => {
              return { ...data, status: "start" };
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
          .collection("time")
          .doc(`${readyToDo.readyId}`)
          .get()
          .then((result: any) => {
            setTime(result.data());
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
        <PlayBtn />
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
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  width: 78px;
  border-radius: 40px;
  border: none;
  position: fixed;
  bottom: 140px;
  margin: 0 auto;
  background-color: black;
  cursor: pointer;
`;

const PlayBtn = styled(IoPlaySharp)`
  color: white;
  padding-left: 4px;
  width: 40px;
  height: 40px;
`;

export default React.memo(Start);
