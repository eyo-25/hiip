import styled from "styled-components";
import { IoPlaySharp, IoAlertCircleOutline } from "react-icons/io5";
import { IUserObjProps } from "../../../Utils/interface";

interface IDragabbleCardProps {
  planTitle: string;
  planTarget: string;
  index: number;
  toDoId: number;
  interval: number;
  toDoObj: any;
  userObj: IUserObjProps;
  isOwner: boolean;
}

const StartCard = ({
  planTitle,
  planTarget,
  interval,
  toDoId,
  index,
  toDoObj,
  userObj,
  isOwner,
}: IDragabbleCardProps) => {
  return (
    <>
      {isOwner && (
        <DragBox>
          <TextBox>
            <h4>{planTitle}</h4>
            <p>{planTarget}</p>
          </TextBox>
          <IntervalBox>
            <h4>{interval}</h4>
            <span>SET</span>
            <StartBtn />
          </IntervalBox>
        </DragBox>
      )}
    </>
  );
};

export default StartCard;

const DragBox = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 35px;
  height: 90px;
  width: 100%;
  background: white;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 3px 4px 12px rgba(0, 0, 0, 0.08);
  /* &:hover {
    box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
    transition: all 0.3s ease-in-out;
  } */
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  letter-spacing: -0.2px;
  h4 {
    font-weight: 600;
    margin-bottom: 10px;
  }
  p {
    color: #9d9d9d;
    font-size: 14px;
  }
`;

const IntervalBox = styled.div`
  display: flex;
  h4 {
    margin-right: 5px;
  }
  span {
    color: #9d9d9d;
  }
`;

const StartBtn = styled(IoPlaySharp)`
  color: #9d9d9d;
  margin-left: 15px;
`;
