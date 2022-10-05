import React, { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Counter from "./component/Counter";

const Timer = () => {
  return (
    <Overlay>
      <Container>
        <Counter />
      </Container>
    </Overlay>
  );
};

export default Timer;

const Overlay = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(black, 80%, #0002ff);
  z-index: 100;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  padding-top: 30px;
  max-width: 375px;
  margin: 0 auto;
  color: white;
  button {
    height: 30px;
    margin-bottom: 10px;
    cursor: pointer;
  }
`;
