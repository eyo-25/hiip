import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { nowDateState, readyState, toDoState } from "../../../../Recoil/atoms";
import moment from "moment";

const Summary = () => {
  const [clickDate, setClickDate] = useRecoilState(nowDateState);
  const [readyToDo, setReadyToDo] = useRecoilState(readyState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const navigate = useNavigate();
  const readyMatch = useMatch("/start/ready");
  const onBackClick = () => {
    if (readyMatch !== null) {
      navigate("/");
    }
  };
  const readyObj = toDos.find((todo) => todo.id === readyToDo.readyId);

  let dDay = 0;
  if (1 <= toDos.length && readyObj) {
    let start = moment(clickDate);
    let end = moment(readyObj?.endDate);

    let result = moment.duration(end.diff(start)).asDays();
    dDay = 1 <= result ? result : 0;
  }

  return (
    <Container onClick={onBackClick} isReady={readyMatch !== null}>
      <SummaryBox isReady={readyMatch !== null}>
        {toDos.length < 1 ? (
          <SummaryWord>
            플랜을 <br /> 추가해주세요
          </SummaryWord>
        ) : (
          <SummaryWord>
            이대론 <br /> 가망이 없다
          </SummaryWord>
        )}
      </SummaryBox>
      <DdayBox>
        <DdayText>{dDay}</DdayText>
        <span>D.day</span>
      </DdayBox>
      {readyMatch !== null && (
        <DetailInfoBox>
          <DetailItems>
            <DetailItem>
              <DetailStatus>
                <h4>4</h4>
                <span>SET</span>
              </DetailStatus>
              <DetailTitle>전날 밀림</DetailTitle>
            </DetailItem>
            <DetailItem>
              <DetailStatus>
                <h4>100</h4>
                <span>%</span>
              </DetailStatus>
              <DetailTitle>계획 성공</DetailTitle>
            </DetailItem>
            <DetailItem>
              <DetailStatus>
                <h4>0</h4>
                <span>SET</span>
              </DetailStatus>
              <DetailTitle>오늘 추가됨</DetailTitle>
            </DetailItem>
            <DetailItem>
              <DetailStatus>
                <h4>100</h4>
                <span>%</span>
              </DetailStatus>
              <DetailTitle>계획 진행</DetailTitle>
            </DetailItem>
          </DetailItems>
        </DetailInfoBox>
      )}
    </Container>
  );
};

const Container = styled.div<{ isReady: boolean }>`
  position: relative;
  max-width: 375px;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.isReady ? "flex-start" : "center")};
  align-items: center;
  margin: 0 auto;
  padding-top: 120px;
  color: white;
  height: ${(props) => (props.isReady ? "40vh" : "70vh")};
`;

const SummaryBox = styled.div<{ isReady: boolean }>`
  display: ${(props) => (props.isReady ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  padding: 130px 0;
`;

const SummaryWord = styled.h4`
  text-align: center;
  line-height: 1.3;
  letter-spacing: -0.5px;
  color: white;
  font-size: 32px;
  font-weight: 400;
`;

const DdayBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-family: "Roboto";
  font-weight: 900;
  padding: 10px 0;
  cursor: pointer;
  span {
    font-size: 20px;
    padding-bottom: 15px;
  }
`;

const DdayText = styled.p`
  font-size: 120px;
  letter-spacing: -10px;
  margin-right: 5px;
`;

const DetailInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0;
`;

const DetailItems = styled.ul`
  position: relative;
  display: flex;
  max-width: 375px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const DetailItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 375px;
  flex-direction: column;
`;

const DetailStatus = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 10px;
  h4 {
    font-weight: 600;
    font-size: 20px;
    padding-right: 5px;
  }
  span {
    font-weight: 400;
    font-size: 18px;
  }
`;

const DetailTitle = styled.p`
  font-size: 11px;
  font-weight: 100;
`;

export default Summary;
