import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { counterState, isStartState } from "../../../Recoil/atoms";
import Counter from "./component/Counter";
import Progress from "./component/Progress";

const Timer = () => {
  const [isStart, setStart] = useRecoilState(isStartState);
  return (
    <Overlay isStart={isStart}>
      <Progress />
      <Container>
        <Counter />
      </Container>
    </Overlay>
  );
};

export default React.memo(Timer);

const Overlay = styled.div<{ isStart: boolean }>`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    black,
    80%,
    ${(props) => (props.isStart ? "#0002ff" : "#fb0045")}
  );
  z-index: 100;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 375px;
  margin-top: 310px;
  color: white;
`;
