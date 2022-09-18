import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import React from "react";
import { IoPlaySharp } from "react-icons/io5";

interface IDragabbleCardProps {
  planTitle: string;
  planTarget: string;
  index: number;
  toDoId: number;
  interval: number;
}

function DragabbleCard({
  planTitle,
  planTarget,
  interval,
  toDoId,
  index,
}: IDragabbleCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={index} key={index}>
      {(provided) => (
        <DragBox
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TextBox>
            <h4>{planTitle}</h4>
            <p>{planTarget}</p>
          </TextBox>
          <IntervalBox>
            <h4>{interval}</h4>
            <span>SET</span>
            <StartBtn></StartBtn>
          </IntervalBox>
        </DragBox>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
// 드래그 카드가 전부 리랜더링 되는것 방지

const DragBox = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 35px;
  height: 90px;
  width: 100%;
  background: white;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.075);
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    font-weight: 600;
    margin-bottom: 8px;
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
