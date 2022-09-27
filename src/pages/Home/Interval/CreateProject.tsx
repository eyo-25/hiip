import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import ProjectInput from "./component/ProjectInput";
import { IUserObjProps } from "../../../Utils/interface";
import CalendarPicker from "./component/CalendarPicker";

function CreateProject({ userObj }: IUserObjProps) {
  return (
    <>
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
  margin-bottom: 15px;
  height: 32vh;
`;

const BottomWrapper = styled.div`
  background-color: white;
  height: 58vh;
`;
