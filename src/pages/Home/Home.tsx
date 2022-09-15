import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TodoBoard from "./Project/component/TodoBoard";
import { ReactComponent as PlusIcon } from "../../Assets/Icons/plus.svg";

const Home = () => {
  const navigate = useNavigate();
  const onCreatePlanClick = () => {
    navigate(`/project/create`);
  };
  return (
    <Container>
      <TodoBoard />
      <CreatePlanBtn onClick={onCreatePlanClick}>
        <PlusIcon />
      </CreatePlanBtn>
    </Container>
  );
};

export default Home;

export const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  max-width: 375px;
  margin: 0 auto;
`;

export const CreatePlanBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  width: 78px;
  border-radius: 40px;
  border: none;
  position: fixed;
  bottom: 180px;
  margin: 0 auto;
  background-color: black;
  cursor: pointer;
  svg {
    width: 30px;
    height: 30px;
  }
`;
