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
    const ok = window.confirm("????????? ?????????????????????????");
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
        status: "ready",
        index: indexCount,
      };
      const timerObj = {
        setIntervalSet: count,
        setBreakSet: count - 1 <= 0 ? 0 : count - 1,
        intervalSet: count,
        breakSet: count - 1 <= 0 ? 0 : count - 1,
        setMin: 0,
        setSec: 10,
        setBreakMin: 0,
        setBreakSec: 5,
        min: 0,
        sec: 10,
        breakMin: 0,
        breakSec: 5,
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
            <DateTitle>?????? ??????</DateTitle>
            <ReactDatePicker
              // minDate={new Date()}
              selected={startDate}
              onChange={onStartChange}
              locale={ko}
              dateFormat="yyyy??? MM??? dd???"
              placeholderText="??????????????? ??????????????????"
              required
            />
          </DateItem>
          <DateItem>
            <DateTitle>?????? ??????</DateTitle>
            <DatePicker
              minDate={startDate ? startDate : new Date()}
              selected={endDate}
              onChange={onEndChange}
              locale={ko}
              dateFormat="yyyy??? MM??? dd???"
              placeholderText="??????????????? ??????????????????"
              required
            />
          </DateItem>
        </DateBox>
        <InputItems>
          <InputItem>
            <ItemTitle>?????? ??????</ItemTitle>
            <ItemInput
              value={planTitle || ""}
              onChange={titleChange}
              placeholder="?????? ????????? ?????? ?????????"
              required
            />
          </InputItem>
          <InputItem>
            <ItemTitle>?????? ??????</ItemTitle>
            <ItemInput
              value={planTarget || ""}
              onChange={targetChange}
              placeholder="?????? ????????? ?????? ?????????"
              required
            />
          </InputItem>
          <InputItem>
            <ItemTitle>????????? ??????</ItemTitle>
            <ItemInput as="div">
              <CountBox>
                <DownBtn onClick={onCountDown} />
                {count}
                <UpBtn onClick={onCountUp} />
              </CountBox>
            </ItemInput>
          </InputItem>
          <InputItem>
            <ItemTitle>??????</ItemTitle>
            <ItemInput as="select">
              <option>?????? ??????</option>
              <option>??????</option>
              <option>??????</option>
              <option>??????</option>
            </ItemInput>
          </InputItem>
        </InputItems>
        <BtnBox>
          <CancelBtn onClick={onCancelClick}>??????</CancelBtn>
          <ConfirmBtn>??????</ConfirmBtn>
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
