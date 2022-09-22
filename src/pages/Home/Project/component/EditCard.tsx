import { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import { IoRemoveCircle, IoAddCircle } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import {
  dateState,
  editPopupState,
  endDateState,
  startDateState,
  toDoState,
} from "../../../../Recoil/atoms";
import { dbService } from "../../../../firebase";
import { IUserObjProps } from "../../../../Utils/interface";

const EditCard = ({
  userObj,
  toDoObj,
}: {
  userObj: IUserObjProps;
  toDoObj: any;
}) => {
  const navigate = useNavigate();
  let params = useParams();
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [dataSet, setDataSet] = useRecoilState(dateState);
  const [planTitle, setPlanTitle] = useState<string>();
  const [planTarget, setPlanTarget] = useState<string>();
  const [count, setCount] = useState(1);
  const [creatorId, setCreatorId] = useState();
  const [creatorAt, setCreatorAt] = useState();
  const [repeat, setRepeat] = useState();
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
  useEffect(() => {
    if (params.todoId && toDos) {
      const editTodo = toDos.find(
        (data) => data.creatorAt + "" === params.todoId + ""
      );
      setStartDate(editTodo?.startDate);
      setEndDate(editTodo?.endDate);
      setPlanTitle(editTodo?.planTitle);
      setPlanTarget(editTodo?.planTarget);
      setCount(editTodo?.intervalSet);
      setCreatorId(editTodo?.creatorId);
      setCreatorAt(editTodo?.creatorAt);
      setRepeat(editTodo?.repeat);
    } else {
      navigate("/");
    }
  }, []);

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
    setStartDate(null);
    setEndDate(null);
    navigate("/");
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
    const editObj = {
      startDate: startDate,
      endDate: endDate,
      planTitle: planTitle,
      planTarget: planTarget,
      intervalSet: count,
      creatorId: creatorId,
      creatorAt: creatorAt,
      repeat: repeat,
      id: toDoObj.id,
    };
    await dbService.collection("plan").doc(`${toDoObj.id}`).update(editObj);
    setStartDate(null);
    setEndDate(null);
    navigate("/");
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
    &:first-child {
      margin-right: 5px;
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
