import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isStartState, timeState } from "../../../../../Recoil/atoms";

function BreakPause({
  secounds,
  minutes,
  id,
}: {
  secounds: number;
  minutes: number;
  id: any;
}) {
  const [time, setTime] = useRecoilState<any>(timeState);
  return (
    <>
      <PauseText variants={TextUpVarients} initial="start" animate="end">
        PAUSE
      </PauseText>
      <GuideText variants={TextOnVarients} initial="start" animate="end">
        다음 세트까지
      </GuideText>
      <CountBox variants={TextUpVarients} initial="start" animate="end">
        <CountText>{minutes < 10 ? `0${minutes}` : minutes}</CountText>
        <CountText>:</CountText>
        <CountText>{secounds < 10 ? `0${secounds}` : secounds}</CountText>
      </CountBox>
      <GuideText variants={TextOnVarients} initial="start" animate="end">
        진행된 <span>SET</span>
      </GuideText>
      <SetText variants={TextUpVarients} initial="start" animate="end">
        {time.setIntervalSet - time.intervalSet}
      </SetText>
    </>
  );
}

export default BreakPause;

const CountBox = styled(motion.div)`
  display: flex;
  align-items: flex-end;
  margin-bottom: 30px;
  div {
    font-weight: 900;
    font-size: 45px;
    &:nth-child(2) {
      margin-bottom: 5px;
      font-size: 40px;
      padding-left: 4px;
      padding-right: 3px;
    }
  }
`;

const SetText = styled(motion.div)`
  display: flex;
  font-family: "Roboto";
  font-weight: 900;
  font-size: 45px;
`;

const CountText = styled.div`
  display: flex;
  font-family: "Roboto";
`;

const PauseText = styled(motion.h1)`
  display: flex;
  font-family: "Roboto";
  font-weight: 900;
  font-size: 70px;
  letter-spacing: -1px;
  margin-bottom: 40px;
`;

const GuideText = styled(motion.p)`
  font-family: "NotoSansKRThin";
  text-align: center;
  font-weight: 100;
  margin-bottom: 5px;
  span {
    font-size: 18px;
  }
`;

const TextOnVarients = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const TextUpVarients = {
  start: {
    opacity: 0,
    y: 2,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      type: "tween",
    },
  },
};
