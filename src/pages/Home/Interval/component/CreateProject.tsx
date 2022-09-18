import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import ProjectInput from "./ProjectInput";
import CalendarPicker from "./CalendarPicker";

function CreateProject() {
  return (
    <>
      <TopWrapper>
        <Container>
          <CalendarPicker />
        </Container>
      </TopWrapper>
      <BottomWrapper>
        <ProjectInput />
      </BottomWrapper>
    </>
  );
}

export default CreateProject;

const TopWrapper = styled.div`
  background-color: white;
  margin-bottom: 15px;
  height: 32vh;
`;

const BottomWrapper = styled.div`
  background-color: white;
  height: 58vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  max-width: 375px;
  margin: 0 auto;
`;
