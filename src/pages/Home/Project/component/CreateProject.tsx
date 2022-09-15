import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import CalendarPicker from "./CalendarPicker";

function CreateProject() {
  return (
    <Container>
      <CalendarPicker />
    </Container>
  );
}

export default CreateProject;

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  max-width: 375px;
  margin: 0 auto;
`;
