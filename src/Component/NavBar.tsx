import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Icon1 } from "../Assets/Icons/planing.svg";
import { ReactComponent as Icon2 } from "../Assets/Icons/start.svg";
import { ReactComponent as Icon3 } from "../Assets/Icons/peedback.svg";
import { ReactComponent as Icon4 } from "../Assets/Icons/mypage.svg";

const NavBar = () => {
  const navigate = useNavigate();
  const onClick = (address: string) => {
    navigate(address);
  };
  const homeMatch = useMatch("/");
  const IntervalMatch = useMatch("/interval");
  const startMatch = useMatch("/start/*");
  const feedbackMatch = useMatch("/feedback");
  const mypageMatch = useMatch("/mypage");
  const homeActive = homeMatch !== null || IntervalMatch !== null;
  return (
    <NavContainer isStart={startMatch !== null}>
      <Nav>
        {homeMatch || IntervalMatch ? (
          <SubItems>
            <SubItem isActive={homeMatch !== null}>
              <Link to="/">프로젝트</Link>
            </SubItem>
            <SubItem isActive={IntervalMatch !== null}>
              <Link to="/interval">인터벌 생성</Link>
            </SubItem>
          </SubItems>
        ) : null}
        <Items>
          <Item isActive={homeActive} onClick={() => onClick("/")}>
            <Icon1 />
            <Link to="/">계획</Link>
          </Item>
          <Item
            isActive={startMatch !== null}
            onClick={() => onClick("/start")}
          >
            <Icon2 />
            <Link to="/start">실행</Link>
          </Item>
          <Item
            isActive={feedbackMatch !== null}
            onClick={() => onClick("/feedback")}
          >
            <Icon3 />
            <Link to="/feedback">피드백</Link>
          </Item>
          <Item
            isActive={mypageMatch !== null}
            onClick={() => onClick("/mypage")}
          >
            <Icon4 />
            <Link to="/mypage">MY</Link>
          </Item>
        </Items>
      </Nav>
    </NavContainer>
  );
};

export default NavBar;

const NavContainer = styled.div<{ isStart: boolean }>`
  display: flex;
  position: fixed;
  bottom: 0;
  height: ${(props) => (props.isStart ? "100px" : "136px")};
  width: 100%;
  background-color: white;
  border-top: 1px solid #c4c4c4;
  z-index: 12;
  align-items: flex-end;
`;
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  max-width: 375px;
  padding-bottom: 30px;
  width: 85%;
  margin: 0 auto;
`;
const SubItems = styled.ul`
  display: flex;
  padding-left: 2px;
`;
const SubItem = styled.li<{ isActive: boolean }>`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  margin-right: 18px;
  a {
    color: ${(props) => (props.isActive ? "#000000" : "#c4c4c4")};
    letter-spacing: -1.7px;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Item = styled.li<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  svg {
    width: 35px;
    height: 35px;
    margin-bottom: 2px;
    rect {
      fill: ${(props) => (props.isActive ? "#000000" : "#c4c4c4")};
    }
    path {
      fill: ${(props) => (props.isActive ? "#000000" : "#c4c4c4")};
    }
  }
  a {
    font-size: 10px;
    font-weight: 400;
    text-align: center;
    color: ${(props) => (props.isActive ? "#000000" : "#c4c4c4")};
  }
`;
