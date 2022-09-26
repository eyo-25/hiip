import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { nowDateState } from "../../../../Recoil/atoms";

const WeeklyDatePicker = () => {
  const date = new Date();
  // 달력 연도
  let calendarYear = date.getFullYear();
  // 달력 월
  let calendarMonth = date.getMonth() + 1;
  // 달력 일
  let calendarToday = date.getDate();

  // 달력 현재 요일
  let calendarMonthTodayDay = date.getDay();

  // 주간 배열
  let arWeek = [null, null, null, null, null, null, null] as any;

  const [count, setCount] = useState(0);

  var addDay1 = count;
  for (var index = calendarMonthTodayDay; index < 7; index++) {
    arWeek[index] = new Date(
      calendarYear,
      calendarMonth - 1,
      calendarToday + addDay1
    );
    addDay1++;
  }

  var addDay2 = count;
  for (let index = calendarMonthTodayDay - 1; index >= 0; index--) {
    --addDay2;
    arWeek[index] = new Date(
      calendarYear,
      calendarMonth - 1,
      calendarToday + addDay2
    );
  }

  var calendarDays = ["일", "월", "화", "수", "목", "금", "토"];

  const onPrevClick = () => {
    setCount((prev) => prev - 7);
  };

  const onNextClick = () => {
    setCount((prev) => prev + 7);
  };

  const onTodayClick = () => {
    setCount(0);
    setClickDate(Moment().format("YYYY-MM-DD"));
  };

  const Moment = require("moment");

  const [clickDate, setClickDate] = useRecoilState(nowDateState);

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
            {arWeek[0].getMonth() + 1}월
          </MonthText>
          <NextBtn onClick={onNextClick} />
        </MonthBox>
        <DateContainer>
          {calendarDays.map((days) => (
            <DayBox key={days}>{days}</DayBox>
          ))}
          {arWeek.map((date: any, index: number) => (
            <DateBox
              key={index}
              clicked={clickDate === Moment(date).format("YYYY-MM-DD")}
              onClick={() => onDateClick(date)}
            >
              <div>{date.getDate()}</div>
            </DateBox>
          ))}
        </DateContainer>
      </Container>
    </Wrapper>
  );
};

export default React.memo(WeeklyDatePicker);

const Wrapper = styled.div`
  width: 100%;
  background-color: white;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  height: 125px;
  position: relative;
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

const DayBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const DateBox = styled.div<{ clicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 2px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    color: ${(props) => (props.clicked ? "white" : "black")};
    background-color: ${(props) => props.clicked && "black"};
    /* &:hover {
      background-color: #eeeeee;
      color: black;
    } */
  }
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
