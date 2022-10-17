import styled from "styled-components";
import { IoPlaySharp } from "react-icons/io5";
import { dbService } from "../../../../firebase";
import { useRecoilState } from "recoil";
import { indexState, readyState, timeState } from "../../../../Recoil/atoms";
import { useMatch } from "react-router-dom";
import React, { useEffect } from "react";

interface IDragabbleCardProps {
  planTitle: string;
  planTarget: string;
  interval: number;
  toDoId: any;
  toDoObj: any;
  status: any;
}

const StartCard = ({
  planTitle,
  planTarget,
  interval,
  toDoId,
  status,
}: IDragabbleCardProps) => {
  const [readyToDo, setReadyToDo] = useRecoilState(readyState);
  const [indexCount, setIndexCount] = useRecoilState(indexState);

  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("user") as any).uid;
    dbService
      .collection("indexcount")
      .doc(`${uid}`)
      .get()
      .then((result: any) => {
        setIndexCount(result.data().index);
      });
  }, []);

  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("user") as any).uid;
    dbService
      .collection("ready")
      .doc(`${uid}`)
      .get()
      .then((result: any) => {
        setReadyToDo({
          readyId: result.data().readyId,
          status: result.data().status,
        });
      });
  }, []);

  const readyMatch = useMatch("/start/ready");
  let intervalArray = [];
  for (let index = 0; index < interval; index++) {
    intervalArray[index] = index;
  }
  const onCardClick = async (toDoId: string) => {
    if (readyMatch !== null && readyToDo.readyId !== toDoId) {
      const uid = JSON.parse(localStorage.getItem("user") as any).uid;
      const readyObj = { readyId: toDoId, status: status };
      const editObj = {
        index: 999999999,
      };
      const returnObj = {
        index: indexCount,
      };
      const indexCountObj = {
        index: indexCount + 1,
      };
      await dbService.collection("ready").doc(uid).set(readyObj);
      await dbService
        .collection("plan")
        .doc(readyToDo.readyId)
        .update(returnObj);
      await dbService.collection("plan").doc(toDoId).update(editObj);
      await dbService.collection("indexcount").doc(uid).update(indexCountObj);
      setReadyToDo(readyObj);
      setIndexCount(indexCount + 1);
    }
  };

  return (
    <>
      <DragBox
        isReadyCard={readyToDo.readyId === toDoId}
        onClick={() => onCardClick(toDoId + "")}
      >
        <TextBox>
          <TitleBox>
            <h4>{planTitle}</h4>
            <StatusBox isStatus={status}>
              <h5>
                {status === "ready" && "대기"}
                {status === "start" && "진행중"}
                {status === "done" && "완료"}
              </h5>
            </StatusBox>
          </TitleBox>
          <p>{planTarget}</p>
        </TextBox>
        <IntervalBox>
          <h4>{interval}</h4>
          <span>SET</span>
          <StartBtn />
        </IntervalBox>
        <IntervalBarBox>
          {intervalArray.map((index) => (
            <IntervalBar
              isReadyCard={readyToDo.readyId === toDoId}
              key={index}
            />
          ))}
        </IntervalBarBox>
      </DragBox>
    </>
  );
};

export default React.memo(StartCard);

const DragBox = styled.div<{ isReadyCard: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 35px;
  height: 90px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
  background: ${(props) => (props.isReadyCard ? "white" : "#f2f2f2")};
  box-shadow: ${(props) =>
    props.isReadyCard && "2px 4px 12px rgba(0, 0, 0, 0.1)"};
  cursor: pointer;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: #9d9d9d;
    font-size: 14px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  h4 {
    letter-spacing: -0.2px;
    font-weight: 600;
    margin-right: 10px;
  }
`;

const StatusBox = styled.div<{ isStatus: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => {
    if (props.isStatus === "start") {
      return "#fb0045";
    } else if (props.isStatus === "done") {
      return "#1012FF";
    } else {
      return "black";
    }
  }};
  border-radius: 10px;
  h5 {
    padding: 0 5px;
    color: white;
    font-size: 10px;
    font-weight: 600;
  }
`;

const IntervalBox = styled.div`
  display: flex;
  h4 {
    margin-right: 5px;
  }
  span {
    color: #9d9d9d;
  }
`;

const StartBtn = styled(IoPlaySharp)`
  color: #9d9d9d;
  margin-left: 15px;
`;

const IntervalBarBox = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 310px;
  height: 4px;
`;

const IntervalBar = styled.div<{ isReadyCard: boolean }>`
  display: flex;
  background-color: ${(props) => (props.isReadyCard ? "black" : "#cccccc")};
  height: 100%;
  width: 100%;
  margin: 0 3px;
`;
