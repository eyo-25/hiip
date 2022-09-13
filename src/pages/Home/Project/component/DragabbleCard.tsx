import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import React from "react";

interface IDragabbleCardProps {
  toDo: string;
  index: number;
}

function DragabbleCard({ toDo, index }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={toDo} index={index} key={index}>
      {(provided) => (
        <DragBox
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDo}
        </DragBox>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
// 드래그 카드가 전부 리랜더링 되는것 방지

const DragBox = styled.li`
  display: flex;
  height: 90px;
  width: 100%;
  background: white;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.075);
`;
