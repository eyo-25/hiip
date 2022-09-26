import styled from "styled-components";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import { useRecoilState } from "recoil";
import {
  dateState,
  endDateState,
  startDateState,
} from "../../../../Recoil/atoms";
import "../DatePicker.css";

function CalendarPicker() {
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [dataSet, setDataSet] = useRecoilState(dateState);
  const onDateSetting = (start: any, end: any) => {
    if (start && end) {
      const startDay =
        start.getFullYear().toString() +
        "년" +
        (start.getMonth() + 1).toString() +
        "월" +
        start.getDate().toString() +
        "일";
      const endDay =
        end.getFullYear().toString() +
        "년 " +
        (end.getMonth() + 1).toString() +
        "월 " +
        end.getDate().toString() +
        "일 ";
      return setDataSet({ start: startDay, end: endDay });
    }
  };
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onDateSetting(start, end);
  };
  const CustomInput = () => <div>안녕</div>;
  return (
    <>
      <CalendarBox>
        <DatePickerBox
          placeholderText="시작날짜 선택"
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          locale={ko}
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          onChange={onChange}
          customInput={<CustomInput />}
        />
      </CalendarBox>
    </>
  );
}

export default CalendarPicker;

const CalendarBox = styled.div`
  width: 100%;
  height: 280px;
  display: flex;
  flex-direction: column;
`;

const DatePickerBox = styled(DatePicker)`
  display: flex;
  width: 100%;
  height: 100%;
`;
