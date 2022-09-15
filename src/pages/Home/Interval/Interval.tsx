import styled from "styled-components";

const Interval = () => {
  return (
    <form>
      <Container>
        <IntervalBox>
          <Items>
            <Item>
              <ItemTitle>시작 날짜</ItemTitle>
              <ItemInput />
            </Item>
            <Item>
              <ItemTitle>종료 날짜</ItemTitle>
              <ItemInput />
            </Item>
            <Item>
              <ItemTitle>인터벌 세트</ItemTitle>
              <ItemInput />
            </Item>
            <Item>
              <ItemTitle>시간</ItemTitle>
              <ItemInput />
            </Item>
            <Item>
              <ItemTitle>반복</ItemTitle>
              <ItemInput />
            </Item>
            <Item>
              <ItemTitle>사운드</ItemTitle>
              <ItemInput />
            </Item>
          </Items>
        </IntervalBox>
      </Container>
    </form>
  );
};

export default Interval;

const Container = styled.div`
  position: relative;
  justify-content: center;
  background-color: white;
`;

const IntervalBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 130px;
  max-width: 375px;
`;

const Items = styled.ul`
  width: 87%;
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
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
  border: none;
  border-radius: 4px;
  background-color: #f5f5f5;
  height: 35px;
  width: 165px;
`;
