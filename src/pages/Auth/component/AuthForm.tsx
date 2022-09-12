import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { authService } from "../../../firebase";

interface IAuthFormProps {
  newCount: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

const BigBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  z-index: 12;
  background-color: white;
`;

const BigForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const CloseBtn = styled.button`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50px;
`;

const AuthForm = ({ close, newCount }: IAuthFormProps) => {
  const { register, handleSubmit, getValues } = useForm();
  const closeClick = () => {
    close(false);
  };
  const [error, setError] = useState("");
  const onValid = async () => {
    const email = getValues("email");
    const password = getValues("password");
    try {
      if (newCount) {
        await createUserWithEmailAndPassword(authService, email, password);
        close(false);
      } else {
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <>
      <BigBox>
        <h4>{newCount ? "계정을 생성하세요" : "HIIP에 로그인하기"}</h4>
        <BigForm onSubmit={handleSubmit(onValid)}>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email을 적어주세요"
          />
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="password를 적어주세요"
          />
          <button>{newCount ? "Creat Account" : "LogIn"}</button>
        </BigForm>
        {error !== "" ? <span>{error}</span> : null}
        <CloseBtn onClick={closeClick}>x</CloseBtn>
      </BigBox>
    </>
  );
};

export default AuthForm;
