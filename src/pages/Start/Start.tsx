import { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { nowDateState } from "../../Recoil/atoms";

const Start = () => {
  const Moment = require("moment");
  const [getMoment, setMoment] = useState(moment());
  const [nowDate, setNowDate] = useRecoilState(nowDateState);
  const today = getMoment;
  const onPrevClick = () => {
    setMoment(getMoment.clone().subtract(1, "month"));
  };
  const onNextClick = () => {
    setMoment(getMoment.clone().add(1, "month"));
  };
  const onNowClick = () => {
    setMoment(moment());
  };

  return (
    <Wrapper>
      <Container>
        <MonthBox>
          <PrevBtn onClick={onPrevClick} />
          <MonthText onClick={onNowClick}>{today.format("MM")}월</MonthText>
          <NextBtn onClick={onNextClick} />
        </MonthBox>
      </Container>
    </Wrapper>
  );
};

export default Start;

const Wrapper = styled.div`
  width: 100%;
  background-color: white;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  max-width: 375px;
  margin: 0 auto;
`;

const MonthBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  font-weight: 600;
  margin-bottom: 15px;
`;

const MonthText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2px;
  border-radius: 50%;
  cursor: pointer;
`;

const PrevBtn = styled(IoChevronBack)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const NextBtn = styled(IoChevronForward)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
