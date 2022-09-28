import { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import React from "react";
import { IoPlaySharp, IoAlertCircleOutline } from "react-icons/io5";
import EditCard from "./EditCard";
import { useMatch, useNavigate } from "react-router-dom";
import { dbService } from "../../../../firebase";
import { IUserObjProps } from "../../../../Utils/interface";

interface IDragabbleCardProps {
  planTitle: string;
  planTarget: string;
  index: number;
  toDoId: number;
  interval: number;
  toDoObj: any;
  userObj: IUserObjProps;
  isOwner: boolean;
}

function DragabbleCard({
  planTitle,
  planTarget,
  interval,
  toDoId,
  index,
  toDoObj,
  userObj,
  isOwner,
}: IDragabbleCardProps) {
  const navigate = useNavigate();
  const editMatch = useMatch("/edit/:todoId");
  const [infoPopup, setInfoPopup] = useState(false);
  const onInfoClick = () => {
    setInfoPopup((prev) => !prev);
  };
  const onEditClick = () => {
    navigate(`/edit/${toDoObj.id}`);
  };
  const onDelete = async () => {
    const ok = window.confirm("플랜을 삭제 하시겠습니까?");
    if (ok) {
      await dbService.doc(`plan/${toDoObj.id}`).delete();
    }
  };
  return (
    <>
      {isOwner && (
        <Draggable draggableId={toDoId + ""} index={index} key={toDoId}>
          {(provided) => (
            <DragBox
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {editMatch ? (
                <Overlay key={toDoId}>
                  <EditCard userObj={userObj} toDoObj={toDoObj}></EditCard>
                </Overlay>
              ) : null}
              <TextBox>
                <h4>{planTitle}</h4>
                <p>{planTarget}</p>
              </TextBox>
              <IntervalBox>
                <h4>{interval}</h4>
                <span>SET</span>
                <StartBtn />
              </IntervalBox>
              <InfoBtn onClick={onInfoClick} />
              {infoPopup ? (
                <InfoBox onClick={onInfoClick}>
                  <BoxCover />
                  <BtnBox>
                    <EditBtn onClick={onEditClick}>편집</EditBtn>
                    <DeleteBtn onClick={onDelete}>삭제</DeleteBtn>
                  </BtnBox>
                </InfoBox>
              ) : null}
            </DragBox>
          )}
        </Draggable>
      )}
    </>
  );
}

export default React.memo(DragabbleCard);
// 드래그 카드가 전부 리랜더링 되는것 방지

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
  box-shadow: 3px 4px 12px rgba(0, 0, 0, 0.08);
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  letter-spacing: -0.2px;
  h4 {
    font-weight: 600;
    margin-bottom: 10px;
  }
  p {
    color: #9d9d9d;
    font-size: 14px;
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
