import React, { useEffect } from "react";
import styled from "styled-components";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { nowDateState } from "../../../Recoil/atoms";

const WeeklyPickerHeader = () => {
  const Moment = require("moment");

  const [clickDate, setClickDate] = useRecoilState(nowDateState);

  // 주간 배열
  let arWeek = [null, null, null, null, null, null, null] as any;

  let addDay1 = 0;
  for (let index = 3; index < 7; index++) {
    arWeek[index] = new Date(
      Moment(clickDate).year(),
      Moment(clickDate).month(),
      Moment(clickDate).date() + addDay1
    );
    addDay1++;
  }

  let addDay2 = 0;
  for (let index = 2; index >= 0; index--) {
    addDay2--;
    arWeek[index] = new Date(
      Moment(clickDate).year(),
      Moment(clickDate).month(),
      Moment(clickDate).date() + addDay2
    );
  }

  const onPrevClick = () => {
    setClickDate(() => {
      const copy = Moment(clickDate);
      return copy.subtract(1, "days");
    });
  };

  const onNextClick = () => {
    setClickDate(() => {
      const copy = Moment(clickDate);
      return copy.add(1, "days");
    });
  };

  const onTodayClick = () => {
    setClickDate(Moment().format("YYYY-MM-DD"));
  };

  const onDateClick = (date: string) => {
    setClickDate(Moment(date).format("YYYY-MM-DD"));
  };

  useEffect(() => {
    setClickDate(Moment().format("YYYY-MM-DD"));
  }, []);

  return (
    <Wrapper>
      <Container>
        <MonthBox>
          <PrevBtn onClick={onPrevClick} />
          <MonthText onClick={onTodayClick}>
            {Moment(clickDate).month() + 1}월
          </MonthText>
          <NextBtn onClick={onNextClick} />
        </MonthBox>
        <DateContainer>
          {arWeek.map((date: any, index: number) => (
            <DateBox key={index} onClick={() => onDateClick(date)}>
              <DateText>{date.getDate()}</DateText>
            </DateBox>
          ))}
        </DateContainer>
      </Container>
    </Wrapper>
  );
};

export default React.memo(WeeklyPickerHeader);

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 20;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  padding-top: 55px;
  position: relative;
  color: white;
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

const DateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  font-size: 12px;
  font-weight: 600;
`;

const DateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:nth-child(4) {
    div {
      background-color: white;
      color: black;
    }
  }
`;

const DateText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
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
