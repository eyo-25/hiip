import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import {
  dateState,
  endDateState,
  startDateState,
  toDoState,
} from "../../../../Recoil/atoms";
import { useForm } from "react-hook-form";
import { IoRemoveCircle, IoAddCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface IForm {
  startDate: string;
  endDate: string;
  planTitle: string;
  planTarget: string;
  intervalSet: number;
  repeat: string;
  id: string;
}

const ProjectInput = () => {
  const setToDos = useSetRecoilState(toDoState);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [dataSet, setDataSet] = useRecoilState(dateState);
  const [count, setCount] = useState(1);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onDateSetting = (start: any, end: any) => {
    if (start && end) {
      const startDay =
        start.getFullYear().toString() +
        "년 " +
        (start.getMonth() + 1).toString() +
        "월 " +
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
  const onStartChange = (dates: any) => {
    const start = dates;
    const end = endDate;
    setStartDate(start);
    onDateSetting(start, end);
  };
  const onEndChange = (dates: any) => {
    const end = dates;
    const start = startDate;
    setEndDate(end);
    onDateSetting(start, end);
  };
  const onCountUp = () => {
    if (count >= 10) return;
    setCount((prev) => prev + 1);
  };
  const onCountDown = () => {
    if (count <= 1) return;
    setCount((prev) => prev - 1);
  };
  const onCancelClick = () => {
    navigate(`/`);
  };
  const handleValid = ({
    startDate,
    endDate,
    planTitle,
    planTarget,
    intervalSet,
    repeat,
  }: IForm) => {};
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <Container>
        <DateBox>
          <DateItem>
            <DateTitle>시작 날짜</DateTitle>
            <ReactDatePicker
              minDate={new Date()}
              selected={startDate}
              onChange={onStartChange}
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              placeholderText="시작날짜를 선택해주세요"
              required
            />
          </DateItem>
          <DateItem>
            <DateTitle>종료 날짜</DateTitle>
            <DatePicker
              minDate={new Date() && startDate}
              selected={endDate}
              onChange={onEndChange}
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              placeholderText="종료날짜를 선택해주세요"
              required
            />
          </DateItem>
        </DateBox>
        <InputItems>
          <InputItem>
            <ItemTitle>플랜 제목</ItemTitle>
            <ItemInput
              {...register("planTitle", {
                required: "플랜 제목을 적어 주세요",
              })}
              placeholder="플랜 제목을 적어 주세요"
            />
          </InputItem>
          <InputItem>
            <ItemTitle>플랜 목표</ItemTitle>
            <ItemInput
              {...register("planTarget", {
                required: "플랜 목표를 적어 주세요",
              })}
              placeholder="플랜 목표를 적어 주세요"
            />
          </InputItem>
          <InputItem>
            <ItemTitle>인터벌 세트</ItemTitle>
            <ItemInput as="div">
              <CountBox>
                <DownBtn onClick={onCountDown} />
                {count}
                <UpBtn onClick={onCountUp} />
              </CountBox>
            </ItemInput>
          </InputItem>
          <InputItem>
            <ItemTitle>반복</ItemTitle>
            <ItemInput as="select">
              <option>반복 안함</option>
              <option>매일</option>
              <option>주말</option>
              <option>평일</option>
            </ItemInput>
          </InputItem>
        </InputItems>
        <BtnBox>
          <CancelBtn onClick={onCancelClick}>취소</CancelBtn>
          <ConfirmBtn>완료</ConfirmBtn>
        </BtnBox>
      </Container>
    </form>
  );
};

export default ProjectInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 375px;
`;

const DateBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-top: 30px;
`;

const DateTitle = styled.div`
  color: #9d9d9d;
  font-weight: 600;
  margin-bottom: 10px;
`;

const DateItem = styled.div`
  display: flex;
  flex-direction: column;
  input {
    border: none;
    border-radius: 4px;
    background-color: #f5f5f5;
    height: 35px;
    width: 165px;
    display: flex;
    text-align: center;
    font-size: 12px;
  }
`;

const InputItems = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ItemTitle = styled.h4`
  display: flex;
  align-items: center;
  color: #9d9d9d;
  font-weight: 600;
`;

const ItemInput = styled.input`
  position: relative;
  border: none;
  border-radius: 4px;
  background-color: #f5f5f5;
  height: 35px;
  width: 165px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 12px;
`;

const BtnBox = styled.div`
  display: flex;
  margin-top: 9px;
  width: 100%;
  height: 44px;
  font-size: 14px;
`;

const ConfirmBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  width: 50%;
  border: 1px solid black;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  padding-bottom: 2px;
`;

const CancelBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 50%;
  border: 1px solid black;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding-bottom: 2px;
`;

const CountBox = styled.div`
  width: 100%;
`;

const DownBtn = styled(IoRemoveCircle)`
  position: absolute;
  left: 10px;
  width: 15px;
  height: 15px;
`;

const UpBtn = styled(IoAddCircle)`
  position: absolute;
  right: 10px;
  width: 15px;
  height: 15px;
`;
