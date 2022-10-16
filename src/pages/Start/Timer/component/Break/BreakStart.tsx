import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";

function BreakStart({
  secounds,
  minutes,
  id,
  intervalset,
}: {
  secounds: number;
  minutes: number;
  id: any;
  intervalset: any;
}) {
  return (
    <>
      <TextBox variants={TextUpVarients} initial="start" animate="end">
        <TextItem>
          <span>{intervalset}</span>SET
        </TextItem>
        <TextItem>BREAK</TextItem>
      </TextBox>
      <SetBox>
        <h4>다음 세트까지</h4>
      </SetBox>
      <CountBox variants={TextUpVarients} initial="start" animate="end">
        <CountText>{minutes < 10 ? `0${minutes}` : minutes}</CountText>
        <CountText>:</CountText>
        <CountText>{secounds < 10 ? `0${secounds}` : secounds}</CountText>
      </CountBox>
    </>
  );
}

export default BreakStart;

const CountBox = styled(motion.div)`
  display: flex;
  align-items: flex-end;
  margin-bottom: 30px;
`;

const CountText = styled.div`
  display: flex;
  font-family: "Roboto";
  font-weight: 900;
  font-size: 55px;
  &:nth-child(2) {
    margin-bottom: 5px;
    font-size: 50px;
    padding-left: 2px;
  }
`;

const SetBox = styled.div`
  h4 {
    font-family: "NotoSansKRThin";
    text-align: center;
    letter-spacing: -1px;
    font-size: 17px;
    font-weight: 100;
    margin-bottom: 15px;
  }
`;

const TextBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const TextItem = styled.div`
  font-family: "Roboto";
  font-weight: 900;
  font-size: 65px;
  margin-bottom: 5px;
  margin-left: 5px;
  span {
    margin-right: 3px;
  }
`;

const TextUpVarients = {
  start: {
    opacity: 0,
    y: 0,
  },
  end: {
    opacity: 1,
    y: 1,
    transition: {
      duration: 0.8,
      type: "tween",
    },
  },
};
