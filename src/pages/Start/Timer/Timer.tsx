import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { counterState, isStartState } from "../../../Recoil/atoms";
import Counter from "./component/Counter";
import Progress from "./component/Progress";

const Timer = () => {
  const [counterStatus, setCounterStatus] = useRecoilState<any>(counterState);
  const [isStart, setStart] = useRecoilState(isStartState);
  return (
    <Overlay>
      <Progress />
      <Container>
        <Counter />
      </Container>
    </Overlay>
  );
};

export default React.memo(Timer);

const Overlay = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(black, 80%, #0002ff);
  z-index: 100;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  max-width: 375px;
  margin-top: 310px;
  color: white;
  button {
    height: 30px;
    margin-bottom: 10px;
    cursor: pointer;
  }
`;
