import { useRecoilState } from "recoil";
import styled from "styled-components";
import { counterState } from "../../../Recoil/atoms";
import Counter from "./component/Counter";
import Progress from "./component/Progress";

const Timer = () => {
  const [counterStatus, setCounterStatus] = useRecoilState<any>(counterState);
  return (
    <Overlay>
      <Container>
        <Progress />
        {!counterStatus && (
          <FeedBackBox>
            <FeedBackText>나중에 울지말고 지금 울면서해라</FeedBackText>
          </FeedBackBox>
        )}
        <Counter />
      </Container>
    </Overlay>
  );
};

export default Timer;

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
  margin: 0 auto;
  color: white;
  button {
    height: 30px;
    margin-bottom: 10px;
    cursor: pointer;
  }
`;

const FeedBackBox = styled.div`
  display: flex;
  margin-bottom: 60px;
`;

const FeedBackText = styled.h4`
  font-size: 14px;
  letter-spacing: -1px;
  color: white;
`;
