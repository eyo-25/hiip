import styled from "styled-components";

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
`;

const AddBtn = styled.button`
  display: flex;
  height: 78px;
  width: 78px;
  border-radius: 40px;
  border: none;
  position: fixed;
  bottom: 180px;
  margin: 0 auto;
  background-color: black;
  cursor: pointer;
`;

const Home = () => {
  return (
    <Container>
      <AddBtn></AddBtn>
    </Container>
  );
};

export default Home;
