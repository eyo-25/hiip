import { useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { useRecoilState } from "recoil";
import {
  clickState,
  endDateStatus,
  nowDateState,
  startDateStatus,
} from "../../../../Recoil/atoms";

const CalendarPicker = () => {
  const [plusCount, setPlusCount] = useState(1);
  const [minusCount, setMinusCount] = useState(1);
  const [clickDate, setClickDate] = useRecoilState(nowDateState);
  const Moment = require("moment");

  const [click, setClick] = useRecoilState(clickState);

  const [startDate, setStartDate] = useRecoilState(startDateStatus);
  const [endDate, setEndDate] = useRecoilState(endDateStatus);

  const nowDate = new Date();

  const [date, setDate] = useState(nowDate);

  useEffect(() => {
    setPlusCount(1);
    setMinusCount(1);
    setDate(nowDate);
    setClickDate(Moment().format("YYYY-MM-DD"));
    setClick(0);
    setStartDate(null);
    setEndDate(null);
  }, []);

  const onDateClick = (date: string) => {
    const clickDate = Moment(date).format("YYYY-MM-DD");
    setClickDate(clickDate);
    let newClick = click >= 3 ? 1 : click + 1;
    // if (
    //   (!(startDate === null) && clickDate < startDate) ||
    //   endDate < clickDate
    // ) {
    //   setClick(1);
    //   newClick = 1;
    //   setEndDate(null);
    // }
    if (clickDate < startDate) {
      setClick(0);
      newClick = 0;
      setStartDate(null);
      setEndDate(null);
    }
    if (startDate <= clickDate && clickDate < endDate) {
      setClick(2);
      newClick = 2;
      setEndDate(clickDate);
    }
    if (newClick === 1) {
      setStartDate(clickDate);
      setStartDate(clickDate);
    } else if (newClick === 2) {
      setEndDate(clickDate);
    } else if (newClick === 3) {
      setStartDate(null);
      setEndDate(null);
    }
    setClick(newClick);
  };

  // 달력 연도
  let calendarYear = date.getFullYear();

  // 달력 월
  let calendarMonth = date.getMonth() + 1;

  //Date 객체에서는 일자가 0이면 이전달의 마지막 일자를 계산하여 이전 달의 마지막 날짜로 자동 설정됩니다.
  let monthLastDate = new Date(calendarYear, calendarMonth, 0);
  // 달력 월의 마지막 일
  let calendarMonthLastDate = monthLastDate.getDate();

  // 달력 월의 시작 일
  let monthStartDay = new Date(calendarYear, date.getMonth(), 1);
  // 달력 월의 시작 요일
  let calendarMonthStartDay = monthStartDay.getDay();

  let arWeek = [] as any;

  // 달력 총 갯수
  for (let index = 0; index < 42; index++) {
    arWeek[index] = null;
  }

  // 현재 월 date배정
  let addDay1 = 0;
  for (
    let index = calendarMonthStartDay;
    index < calendarMonthLastDate + calendarMonthStartDay;
    index++
  ) {
    arWeek[index] = new Date(
      calendarYear,
      calendarMonth - 1,
      monthStartDay.getDate() + addDay1
    );
    addDay1++;
  }

  //이전달 마지막일
  let prevMonthLastDate = new Date(
    calendarYear,
    calendarMonth - 1,
    0
  ).getDate();

  // 이전 월 date배정
  let addDay2 = 1;
  for (let index = calendarMonthStartDay - 1; index >= 0; index--) {
    --addDay2;
    arWeek[index] = new Date(
      calendarYear,
      calendarMonth - 2,
      prevMonthLastDate + addDay2
    );
  }

  let addDay3 = 0;
  let prevDate = calendarMonthLastDate + calendarMonthStartDay;
  for (let index = prevDate; index < 42; index++) {
    arWeek[index] = new Date(
      calendarYear,
      calendarMonth,
      monthStartDay.getDate() + addDay3
    );
    addDay3++;
  }

  const onPrevClick = () => {
    setDate(new Date(nowDate.setMonth(nowDate.getMonth() - minusCount)));
    setMinusCount((prev) => prev + 1);
    setPlusCount((prev) => prev - 1);
  };
  const onNextClick = () => {
    setDate(new Date(nowDate.setMonth(nowDate.getMonth() + plusCount)));
    setPlusCount((prev) => prev + 1);
    setMinusCount((prev) => prev - 1);
  };
  const onNowClick = () => {
    setDate(nowDate);
    setPlusCount(1);
    setMinusCount(1);
    setClickDate(Moment().format("YYYY-MM-DD"));
    setClick(0);
    setStartDate(null);
    setEndDate(null);
  };

  let calendarDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <Wrapper>
      <Container>
        <MonthBox>
          <PrevBtn onClick={onPrevClick} />
          <MonthText onClick={onNowClick}>{calendarMonth}월</MonthText>
          <NextBtn onClick={onNextClick} />
        </MonthBox>
        <DateContainer>
          {calendarDays.map((days) => (
            <DayBox key={days}>{days}</DayBox>
          ))}
          {arWeek.map((date: any, index: number) => (
            <DateBox key={index}>
              <HoverBox
                clicked={clickDate === Moment(date).format("YYYY-MM-DD")}
                onClick={() => onDateClick(date)}
              >
                <DateText nowMonth={date.getMonth() + 1 != calendarMonth}>
                  {date.getDate()}
                </DateText>
                {startDate <= Moment(date).format("YYYY-MM-DD") &&
                  Moment(date).format("YYYY-MM-DD") <= endDate && (
                    <DateBar isSame={startDate === endDate}>
                      <BarPoint />
                    </DateBar>
                  )}
                {startDate === Moment(date).format("YYYY-MM-DD") && (
                  <DateBar isSame={startDate === endDate}>
                    <BarPoint />
                  </DateBar>
                )}
              </HoverBox>
            </DateBox>
          ))}
        </DateContainer>
      </Container>
    </Wrapper>
  );
};

export default React.memo(CalendarPicker);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  max-width: 410px;
  margin: 0 auto;
`;

const MonthBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 91%;
  font-weight: 600;
  margin-top: 5px;
  margin-bottom: 20px;
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

const DateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  font-size: 12px;
  font-weight: 600;
`;

const DateBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.3rem;
  cursor: pointer;
`;

const DayBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

const HoverBox = styled.div<{ clicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.5px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  color: ${(props) => props.clicked && "white"};
  background-color: ${(props) => props.clicked && "black"};
`;

const DateText = styled.div<{ nowMonth: boolean }>`
  color: ${(props) => props.nowMonth && "#c4c4c4"};
`;

const DateBar = styled.div<{ isSame: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 4px;
  background-color: ${(props) => (props.isSame ? "#FFC500" : "#0002ff")};
`;

const BarPoint = styled.div`
  width: 5px;
  height: 100%;
  border-radius: 50%;
  background-color: #fb0045;
`;
