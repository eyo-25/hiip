import { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import { IoRemoveCircle, IoAddCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  clickState,
  endChange,
  indexState,
  nowDateState,
  startChange,
  toDoState,
} from "../../../../Recoil/atoms";
import { dbService } from "../../../../firebase";
import { IUserObjProps } from "../../../../Utils/interface";

const ProjectInput = ({ userObj }: IUserObjProps) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useRecoilState(startChange);
  const [endDate, setEndDate] = useRecoilState(endChange);
  const [planTitle, setPlanTitle] = useState<string>();
  const [planTarget, setPlanTarget] = useState<string>();
  const [count, setCount] = useState(1);
  const [clickDate, setClickDate] = useRecoilState(nowDateState);
  const [click, setClick] = useRecoilState(clickState);
  const Moment = require("moment");
  const [indexCount, setIndexCount] = useRecoilState(indexState);

  useEffect(() => {
    setStartDate(null);
    setEndDate(null);
    setIndexCount(0);
  }, []);

  useEffect(() => {
    if (endDate < startDate) {
      setEndDate(null);
    }
  }, [startDate]);

  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("user") as any).uid;
    dbService
      .collection("indexcount")
      .doc(`${uid}`)
      .get()
      .then((result: any) => {
        setIndexCount(result.data().index);
      })
      .catch(() => {
        setIndexCount(0);
      });
  }, []);

  const onStartChange = (dates: any) => {
    setStartDate(dates);
    setClickDate(Moment(dates).format("YYYY-MM-DD"));
    setClick(1);
  };
  const onEndChange = (dates: any) => {
    setEndDate(dates);
    setClickDate(Moment(dates).format("YYYY-MM-DD"));
    setClick(2);
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
    const ok = window.confirm("플랜을 생성하시겠습니까?");
    if (ok) {
      const uid = JSON.parse(localStorage.getItem("user") as any).uid;
      event.preventDefault();
      const newObj = {
        startDate: startDate,
        endDate: endDate,
        planTitle: planTitle,
        planTarget: planTarget,
        intervalSet: count,
        creatorId: uid,
        repeat: 1,
        // creatorAt: Date.now(),
        index: indexCount,
      };
      const timerObj = {
        interval: 2,
        min: 0,
        sec: 10,
        breakMin: 0,
        breakSec: 5,
        breakSet: 1,
      };
      await (await dbService.collection("plan").add(newObj))
        .collection("timer")
        .doc("time")
        .set(timerObj);

      const indexCountObj = {
        index: indexCount + 1,
      };
      if (indexCount < 1) {
        await dbService.collection("indexcount").doc(uid).set(indexCountObj);
      } else {
        await dbService.collection("indexcount").doc(uid).update(indexCountObj);
      }
      setStartDate(null);
      setEndDate(null);
      navigate("/plan");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Container>
        <DateBox>
          <DateItem>
            <DateTitle>시작 날짜</DateTitle>
            <ReactDatePicker
              // minDate={new Date()}
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
              minDate={startDate ? startDate : new Date()}
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
  z-index: 21;
`;

const DateBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-top: 25px;
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
  margin-top: 5px;
  width: 100%;
  height: 44px;
  font-size: 14px;
  margin-bottom: 25px;
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
