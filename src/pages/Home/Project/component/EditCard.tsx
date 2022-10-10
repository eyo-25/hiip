import { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import { IoRemoveCircle, IoAddCircle } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import {
  endDateState,
  startDateState,
  timeState,
  toDoState,
} from "../../../../Recoil/atoms";
import { dbService } from "../../../../firebase";

const EditCard = () => {
  const navigate = useNavigate();
  let params = useParams();
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [planTitle, setPlanTitle] = useState<string>();
  const [planTarget, setPlanTarget] = useState<string>();
  const [time, setTime] = useRecoilState<any>(timeState);
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (params.todoId && toDos) {
      const editTodo = toDos.find(
        (data) => data.id + "" === params.todoId + ""
      );
      setStartDate(editTodo?.startDate);
      setEndDate(editTodo?.endDate);
      setPlanTitle(editTodo?.planTitle);
      setPlanTarget(editTodo?.planTarget);
      setCount(editTodo?.intervalSet);

      dbService
        .collection("plan")
        .doc(`${params.todoId}`)
        .collection("timer")
        .doc("time")
        .get()
        .then((result: any) => {
          setTime({
            setIntervalSet: result.data().intervalSet,
            setBreakSet: result.data().breakSet,
            min: result.data().setMin,
            sec: result.data().setSec,
            intervalSet: result.data().intervalSet,
            breakSet: result.data().breakSet,
            breakMin: result.data().setBreakMin,
            breakSec: result.data().setBreakSec,
            setMin: result.data().setMin,
            setSec: result.data().setSec,
            setBreakMin: result.data().setBreakMin,
            setBreakSec: result.data().setBreakSec,
          });
        });
    } else {
      navigate("/plan");
    }
  }, []);

  const onStartChange = (dates: any) => {
    const start = dates;
    setStartDate(start);
  };
  const onEndChange = (dates: any) => {
    const end = dates;
    setEndDate(end);
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
    setStartDate(null);
    setEndDate(null);
    navigate("/plan");
  };
  const titleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setPlanTitle(value);
  };
  const targetChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setPlanTarget(value);
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (startDate > endDate) {
      alert("시작일이 마감일과 같거나 작아야합니다:)");
    }
    if (startDate <= endDate) {
      const editObj = {
        startDate: startDate,
        endDate: endDate,
        planTitle: planTitle,
        planTarget: planTarget,
        intervalSet: count,
      };
      await dbService
        .collection("plan")
        .doc(`${params.todoId}`)
        .update(editObj);
      setStartDate(null);
      setEndDate(null);
      navigate("/plan");
      await dbService
        .collection("plan")
        .doc(`${params.todoId}`)
        .collection("timer")
        .doc("time")
        .update({
          setIntervalSet: count,
          setBreakSet: count - 1,
          intervalSet: count,
          breakSet: count - 1,
          min: time.setMin,
          sec: time.setSec,
          breakMin: time.setBreakMin,
          breakSec: time.setBreakSec,
        });
    }
  };
  return (
    <form onSubmit={onSubmit}>
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
              value={planTitle || ""}
              onChange={titleChange}
              placeholder="플랜 제목을 적어 주세요"
              required
            />
          </InputItem>
          <InputItem>
            <ItemTitle>플랜 목표</ItemTitle>
            <ItemInput
              value={planTarget || ""}
              onChange={targetChange}
              placeholder="플랜 목표를 적어 주세요"
              required
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
          <ConfirmBtn>수정 완료</ConfirmBtn>
        </BtnBox>
      </Container>
    </form>
  );
};

export default EditCard;

const Container = styled.div`
  display: flex;
  background-color: white;
  border-radius: 5px;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 375px;
  padding: 15px;
  z-index: 12px;
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
    &:nth-child(1) {
      margin-left: 5px;
    }
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
  cursor: pointer;
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
  cursor: pointer;
`;

const CountBox = styled.div`
  width: 100%;
`;

const DownBtn = styled(IoRemoveCircle)`
  position: absolute;
  left: 10px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const UpBtn = styled(IoAddCircle)`
  position: absolute;
  right: 10px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;
