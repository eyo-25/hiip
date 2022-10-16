import { motion } from "framer-motion";
import styled from "styled-components";

function IntervalStart({
  secounds,
  minutes,
  id,
}: {
  secounds: number;
  minutes: number;
  id: any;
}) {
  return (
    <>
      <CountBox
        variants={TimerUpVarients}
        layoutId={id}
        initial="start"
        animate="end"
      >
        <CountText>{minutes < 10 ? `0${minutes}` : minutes}</CountText>
        <CountText>:</CountText>
        <CountText>{secounds < 10 ? `0${secounds}` : secounds}</CountText>
      </CountBox>
    </>
  );
}

export default IntervalStart;

const CountBox = styled(motion.div)`
  display: flex;
  align-items: flex-end;
  margin-bottom: 30px;
  div {
    font-weight: 900;
    font-size: 80px;
    letter-spacing: -3px;
    &:nth-child(2) {
      margin-bottom: 10px;
      font-size: 70px;
      padding-left: 7px;
      padding-right: 5px;
    }
  }
`;

const CountText = styled.div`
  display: flex;
  font-family: "Roboto";
`;

const TimerUpVarients = {
  start: {
    opacity: 0,
    y: 0,
  },
  end: {
    y: 1,
    opacity: 1,
    scale: 1.1,
    transition: {
      duration: 0.5,
      type: "tween",
    },
  },
};
