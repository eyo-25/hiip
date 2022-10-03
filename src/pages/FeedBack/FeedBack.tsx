import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const FeedBack = () => {
  const [isStart, setIsStart] = useState(false);
  const onStartClick = () => {
    setIsStart((prev) => !prev);
  };
  const time = { min: 25, sec: 0 };
  return (
    <Container>
      <Box onClick={onStartClick}>d</Box>
    </Container>
  );
};

export default FeedBack;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  padding-top: 30px;
  max-width: 375px;
  margin: 0 auto;
`;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  background-color: #e5e5e5;
`;
