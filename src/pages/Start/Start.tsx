import styled from "styled-components";
import Background from "../../Assets/image/start_background2.png";
import WeeklyPickerHeader from "./Component/WeeklyPickerHeader";
import { IoPlaySharp } from "react-icons/io5";
import SummaryBox from "./Component/SummaryBox";
import StartBoard from "./Component/StartBoard";
import { IUserObjProps } from "../../Utils/interface";
import { useMatch, useNavigate } from "react-router-dom";

const Start = ({ userObj }: IUserObjProps) => {
  const navigate = useNavigate();
  const readyMatch = useMatch("/start/ready");
  const onPlayClick = () => {
    navigate("/start/ready");
  };
  const onBackClick = () => {
    if (readyMatch !== null) {
      navigate("/start");
    }
  };
  return (
    <Wrapper>
      <BackgroundBox onClick={onBackClick}>
        <BackgroundImg />
      </BackgroundBox>
      <Container>
        <WeeklyPickerHeader />
        <SummaryBox />
        <StartBoard userObj={userObj} />
      </Container>
      <PlayBtnBox>
        <PlayBtn onClick={onPlayClick} />
      </PlayBtnBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  background-color: #0c0c0c;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BackgroundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
`;

const BackgroundImg = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 65%;
`;

const PlayBtnBox = styled.button`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  width: 78px;
  border-radius: 40px;
  border: none;
  position: fixed;
  bottom: 140px;
  margin: 0 auto;
  background-color: black;
  cursor: pointer;
`;

const PlayBtn = styled(IoPlaySharp)`
  color: white;
  padding-left: 4px;
  width: 40px;
  height: 40px;
`;

export default Start;
