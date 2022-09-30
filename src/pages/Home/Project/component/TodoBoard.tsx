import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { nowDateState, toDoState } from "../../../../Recoil/atoms";
import DragabbleCard from "./DragabbleCard";

//Droppable과 Draggable의 Children은 함수여야 한다.
//Draggable의 prop중 dragHandleProps은 요소를 드래그 가능하게 한다.
const TodoBoard = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [clickDate, setClickDate] = useRecoilState(nowDateState);
  const Moment = require("moment");
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
    <>
      {toDos.length < 1 && (
        <GuidText>
          TO-DO를 추가하고
          <br />
          인터벌 플랜을
          <br />
          완성해주세요
        </GuidText>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <DropBox>
            <Droppable droppableId="boards">
              {(provided) => (
                <Area ref={provided.innerRef} {...provided.droppableProps}>
                  {toDos?.map((toDo, index) => (
                    <CardBox
                      key={toDo.creatorAt}
                      dateNow={
                        Moment(toDo.startDate).format("YYYY-MM-DD") <=
                          clickDate &&
                        clickDate <= Moment(toDo.endDate).format("YYYY-MM-DD")
                      }
                    >
                      <DragabbleCard
                        toDoId={toDo.id}
                        planTitle={toDo.planTitle}
                        planTarget={toDo.planTarget}
                        interval={toDo.intervalSet}
                        index={index}
                      />
                    </CardBox>
                  ))}
                  {provided.placeholder}
                </Area>
              )}
            </Droppable>
          </DropBox>
        </Wrapper>
      </DragDropContext>
    </>
  );
};

export default TodoBoard;

const Wrapper = styled.div`
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

const CardBox = styled.div<{ dateNow: boolean }>`
  display: ${(props) => !props.dateNow && "none"};
`;

const Area = styled.div`
  display: flex;
  flex-direction: column;
`;

const GuidText = styled.h4`
  font-size: 32px;
  font-weight: 600;
  line-height: 1.4;
  color: #e0e0e0;
`;
