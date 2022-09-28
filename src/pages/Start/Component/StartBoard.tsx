import { useMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../../../Recoil/atoms";
import { IUserObjProps } from "../../../Utils/interface";
import StartCard from "./StartCard";

const StartBoard = ({ userObj }: IUserObjProps) => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const readyMatch = useMatch("/start/ready");
  return (
    <Wrapper isReady={readyMatch !== null}>
      <Container>
        {toDos?.map((toDo, index) => (
          <StartCard
            key={index}
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
      </Container>
    </Wrapper>
  );
};

export default StartBoard;

const Wrapper = styled.div<{ isReady: boolean }>`
  position: relative;
  width: 100%;
  height: ${(props) => (props.isReady ? "70vh" : "30vh")};
  background-color: white;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 375px;
  margin: 0 auto;
  padding-top: 30px;
`;
