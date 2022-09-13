import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../../../../Recoil/atoms";
import DragabbleCard from "./DragabbleCard";

//Droppable과 Draggable의 Children은 함수여야 한다.
//Draggable의 prop중 dragHandleProps은 요소를 드래그 가능하게 한다.
const TodoBoard = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setToDos((oldToDos) => {
      const toDosCopy = [...oldToDos];
      toDosCopy.splice(source.index, 1);
      toDosCopy.splice(destination?.index, 0, draggableId);
      return toDosCopy;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Droppable droppableId="toDo">
          {(provided) => (
            <DropBox ref={provided.innerRef} {...provided.droppableProps}>
              {toDos.map((toDo, index) => (
                <DragabbleCard key={toDo} toDo={toDo} index={index} />
              ))}
            </DropBox>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
};

export default TodoBoard;

const Wrapper = styled.div`
  margin-top: 200px;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const DropBox = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
