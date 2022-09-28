import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Summary = () => {
  const navigate = useNavigate();
  const readyMatch = useMatch("/start/ready");
  const onBackClick = () => {
    if (readyMatch !== null) {
      navigate("/start");
    }
  };
  return (
    <Container onClick={onBackClick} isReady={readyMatch !== null}>
      <SummaryBox isReady={readyMatch !== null}>
        <SummaryWord>
          이대론 <br /> 가망이 없다
        </SummaryWord>
      </SummaryBox>
      <DdayBox>
        <DdayText>0</DdayText>
        <span>D.day</span>
      </DdayBox>
    </Container>
  );
};

const Container = styled.div<{ isReady: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 375px;
  margin: 0 auto;
  padding-top: 150px;
  position: relative;
  color: white;
  height: ${(props) => (props.isReady ? "40vh" : "70vh")};
`;

const SummaryBox = styled.div<{ isReady: boolean }>`
  display: ${(props) => (props.isReady ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  padding: 100px 0;
`;

const SummaryWord = styled.h4`
  text-align: center;
  line-height: 1.3;
  letter-spacing: -0.8px;
  color: white;
  font-size: 32px;
  font-weight: 400;
`;

const DdayBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-family: "Roboto";
  font-weight: 900;
  span {
    font-size: 20px;
    padding-bottom: 15px;
  }
`;

const DdayText = styled.p`
  font-size: 120px;
  letter-spacing: -10px;
  margin-right: 10px;
`;

export default Summary;
