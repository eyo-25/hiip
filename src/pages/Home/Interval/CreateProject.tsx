import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import ProjectInput from "./component/ProjectInput";
import { IUserObjProps } from "../../../Utils/interface";
import CalendarPicker from "./component/CalendarPicker";
import Header from "../../../Component/Header";

function CreateProject({ userObj }: IUserObjProps) {
  return (
    <>
      <Header />
      <TopWrapper>
        <CalendarPicker />
      </TopWrapper>
      <BottomWrapper>
        <ProjectInput userObj={userObj} />
      </BottomWrapper>
    </>
  );
}

export default CreateProject;

const TopWrapper = styled.div`
  background-color: white;
  margin-bottom: 10px;
  height: 34vh;
`;

const BottomWrapper = styled.div`
  background-color: white;
  height: 50vh;
`;
