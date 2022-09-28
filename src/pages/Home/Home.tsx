import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TodoBoard from "./Project/component/TodoBoard";
import { ReactComponent as PlusIcon } from "../../Assets/Icons/plus.svg";
import { useRecoilState } from "recoil";
import { toDoState } from "../../Recoil/atoms";
import { useEffect } from "react";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { authService, dbService } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { IUserObjProps } from "../../Utils/interface";
import WeeklyDatePicker from "./Project/component/WeeklyDatePicker";
import Header from "../../Component/Header";

export interface ITodo {
  startDate: any;
  endDate: any;
  planTitle: any;
  planTarget: any;
  intervalSet: any;
  repeat: any;
  id: any;
}

const Home = ({ userObj }: IUserObjProps) => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const navigate = useNavigate();
  const onCreatePlanClick = () => {
    navigate(`/interval`);
  };
  useEffect(() => {
    const q = query(
      collection(dbService, "plan"),
      orderBy("creatorAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setToDos(() => {
        const newArray2 = newArray.map((e) => {
          e.startDate = e.startDate.toDate();
          e.endDate = e.endDate.toDate();
          return e;
        });
        return newArray2;
      });
    });
    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });
  }, []);

  return (
    <>
      <Header />
      <WeeklyDatePicker />
      <Container>
        <TodoBoard userObj={userObj} />
        <CreatePlanBtn onClick={onCreatePlanClick}>
          <PlusIcon />
        </CreatePlanBtn>
      </Container>
    </>
  );
};

export default Home;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  padding-top: 30px;
  max-width: 375px;
  margin: 0 auto;
`;

export const CreatePlanBtn = styled.button`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  width: 78px;
  border-radius: 40px;
  border: none;
  position: fixed;
  bottom: 180px;
  margin: 0 auto;
  background-color: black;
  cursor: pointer;
  svg {
    width: 30px;
    height: 30px;
  }
`;
