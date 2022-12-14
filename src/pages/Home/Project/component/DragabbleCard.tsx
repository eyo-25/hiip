import { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import React from "react";
import { IoPlaySharp, IoAlertCircleOutline } from "react-icons/io5";
import { useMatch, useNavigate } from "react-router-dom";
import { dbService } from "../../../../firebase";
import { indexState, readyState, toDoState } from "../../../../Recoil/atoms";
import { useRecoilState } from "recoil";
import EditCard from "./EditCard";

interface IDragabbleCardProps {
  planTitle: string;
  planTarget: string;
  index: number;
  toDoId: any;
  interval: number;
  status: string;
}

function DragabbleCard({
  planTitle,
  planTarget,
  interval,
  toDoId,
  index,
  status,
}: IDragabbleCardProps) {
  const navigate = useNavigate();
  const editMatch = useMatch("/plan/edit/:todoId");
  const [infoPopup, setInfoPopup] = useState(false);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [readyToDo, setReadyToDo] = useRecoilState(readyState);
  const [indexCount, setIndexCount] = useRecoilState(indexState);
  const uid = JSON.parse(localStorage.getItem("user") as any).uid;

  const [counter, setCounter] = useState(100);
  const intervalRef = React.useRef(null) as any;

  const startCounter = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
      console.log(counter);
      if (3 < counter) {
        setInfoPopup(true);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 1000);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setInfoPopup(false);
      intervalRef.current = null;
    }
  };

  const indexCountObj = {
    index: indexCount + 1,
  };
  const editObj = {
    index: 999999999,
  };
  const onInfoClick = () => {
    setInfoPopup((prev) => !prev);
  };
  const onEditClick = () => {
    navigate(`/plan/edit/${toDoId}`);
  };
  const onStartClick = async () => {
    navigate("/");
    if (readyToDo.readyId !== toDoId) {
      const readyObj = { readyId: toDoId, status: status };
      await dbService.collection("plan").doc(toDoId).update(editObj);
      await dbService.collection("ready").doc(uid).set(readyObj);
      await dbService
        .collection("plan")
        .doc(readyToDo.readyId)
        .update(indexCountObj);
      setReadyToDo(readyObj);
    }
  };
  const onDelete = async () => {
    const ok = window.confirm("????????? ?????? ???????????????????");
    if (ok) {
      await dbService.doc(`plan/${toDoId}`).delete();
      await dbService
        .doc(`plan/${toDoId}`)
        .collection("timer")
        .doc("time")
        .delete();
      if (1 <= toDos.length && readyToDo.readyId === toDoId) {
        const readyObj = { readyId: toDos[1].id, status: toDos[1].status };
        await dbService.collection("plan").doc(toDos[1].id).update(editObj);
        await dbService.collection("ready").doc(uid).set(readyObj);
        await dbService
          .collection("plan")
          .doc(toDos[1].id)
          .update(indexCountObj);
        setReadyToDo(readyObj);
      }
    }
  };
  let intervalArray = [] as any;
  for (let index = 0; index < interval; index++) {
    intervalArray[index] = index;
  }
  return (
    <>
      <Draggable draggableId={toDoId + ""} index={index} key={toDoId}>
        {(provided) => (
          <DragBox
            onMouseDown={startCounter}
            // onMouseUp={stopCounter}
            onMouseLeave={stopCounter}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {editMatch ? (
              <Overlay key={toDoId}>
                <EditCard />
              </Overlay>
            ) : null}
            <TextBox>
              <TitleBox>
                <h4>{planTitle}</h4>
                <StatusBox isStatus={status}>
                  <h5>
                    {status === "start" && "?????????"}
                    {status === "done" && "??????"}
                  </h5>
                </StatusBox>
              </TitleBox>
              <p>{planTarget}</p>
            </TextBox>
            <IntervalBox>
              <h4>{interval}</h4>
              <span>SET</span>
              <StartBtn onClick={onStartClick} />
            </IntervalBox>
            <InfoBtn onClick={onInfoClick} />
            {infoPopup ? (
              <InfoBox onClick={onInfoClick}>
                <BoxCover />
                <BtnBox>
                  <EditBtn onClick={onEditClick}>??????</EditBtn>
                  <DeleteBtn onClick={onDelete}>??????</DeleteBtn>
                </BtnBox>
              </InfoBox>
            ) : null}
            <IntervalBarBox>
              {intervalArray.map((index: number) => (
                <IntervalBar key={index} />
              ))}
            </IntervalBarBox>
          </DragBox>
        )}
      </Draggable>
    </>
  );
}

export default React.memo(DragabbleCard);
// ????????? ????????? ?????? ???????????? ????????? ??????

const DragBox = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 35px;
  height: 90px;
  width: 100%;
  background: white;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1);
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
  cursor: pointer;
`;

const InfoBtn = styled(IoAlertCircleOutline)`
  color: #c4c4c4;
  position: absolute;
  width: 18px;
  height: 18px;
  right: 8px;
  top: 8px;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
`;

const BtnBox = styled.div`
  display: flex;
  width: 50%;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;
const EditBtn = styled.div`
  width: 100%;
  padding: 10px 0;
  color: white;
  border: 1px solid white;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  cursor: pointer;
  z-index: 12;
`;
const DeleteBtn = styled.div`
  width: 100%;
  padding: 10px 0;
  background-color: white;
  color: black;
  border: 1px solid white;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
  z-index: 12;
`;

const BoxCover = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 1);
  opacity: 0.9;
  border-radius: 10px;
  z-index: 10;
`;

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
  cursor: pointer;
`;

const IntervalBarBox = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 310px;
  height: 4px;
`;

const IntervalBar = styled.div`
  display: flex;
  background-color: #1e272e;
  height: 100%;
  width: 100%;
  margin: 0 3px;
`;
