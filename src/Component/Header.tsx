import styled from "styled-components";

function Header() {
  return (
    <Container>
      <HeaderBox>헤더입니다</HeaderBox>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 75px;
  background-color: #c4c4c4;
`;

const HeaderBox = styled.div`
  display: flex;
  max-width: 375px;
  margin: 0 auto;
`;
