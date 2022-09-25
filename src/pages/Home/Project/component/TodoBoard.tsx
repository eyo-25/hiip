import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../../../../Recoil/atoms";
import { IUserObjProps } from "../../../../Utils/interface";
import DragabbleCard from "./DragabbleCard";

//Droppable과 Draggable의 Children은 함수여야 한다.
//Draggable의 prop중 dragHandleProps은 요소를 드래그 가능하게 한다.
const TodoBoard = ({ userObj }: IUserObjProps) => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    setToDos((oldToDos) => {
      const toDosCopy = [...oldToDos];
      const taskObj = toDosCopy[source.index];
      toDosCopy.splice(source.index, 1);
      toDosCopy.splice(destination?.index, 0, taskObj);
      return toDosCopy;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <DropBox>
          <Droppable droppableId="boards">
            {(provided, info) => (
              <Area ref={provided.innerRef} {...provided.droppableProps}>
                {toDos?.map((toDo, index) => (
                  <DragabbleCard
                    key={toDo.creatorAt}
                    toDoId={toDo.creatorAt}
                    toDoObj={toDo}
                    planTitle={toDo.planTitle}
                    planTarget={toDo.planTarget}
                    interval={toDo.intervalSet}
                    index={index}
                    userObj={userObj}
                    isOwner={toDo.creatorId === userObj.uid}
                  />
                ))}
                {provided.placeholder}
              </Area>
            )}
          </Droppable>
        </DropBox>
      </Wrapper>
    </DragDropContext>
  );
};

export default TodoBoard;

const Wrapper = styled.div`
  /* margin-top: 125px; */
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const DropBox = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Area = styled.div``;
