import styled from "styled-components";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { authService, dbService, firebaseInstance } from "../../../firebase";
import { ReactComponent as HiipIcon } from "../../../Assets/Icons/HIIPLogo.svg";

interface IAuthFormProps {
  newCount: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthForm = ({ close, newCount }: IAuthFormProps) => {
  const { register, handleSubmit, getValues } = useForm();
  const closeClick = () => {
    close(false);
  };
  const [error, setError] = useState("");
  const onValid = async () => {
    const email = getValues("email");
    const password = getValues("password");
    const nickname = getValues("nickname");
    try {
      if (newCount) {
        await firebaseInstance
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((result: any) => {
            let userInfo = {
              email: email,
              nickname: nickname,
            };
            result.user.updateProfile({
              displayName: nickname,
            });
            dbService.collection("user").doc(result.user.uid).set({ userInfo });
          });
        // await createUserWithEmailAndPassword(authService, email, password);
        close(false);
      } else {
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <Container>
      <BigBox>
        <BigTitle>
          {newCount ? (
            "계정을 생성하세요"
          ) : (
            <LogoBox>
              <HiipLogo />에 로그인하기
            </LogoBox>
          )}
        </BigTitle>
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
          {newCount && (
            <input
              {...register("nickname", { required: true })}
              type="text"
              placeholder="nickname를 적어주세요"
            />
          )}
          <button>{newCount ? "Creat Account" : "LogIn"}</button>
        </BigForm>
        {error !== "" ? <span>{error}</span> : null}
        <CloseBtn onClick={closeClick}>Cancle</CloseBtn>
      </BigBox>
    </Container>
  );
};

export default AuthForm;

const Container = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: white;
  z-index: 12;
`;

const BigBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 375px;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
`;

const HiipLogo = styled(HiipIcon)`
  display: flex;
  width: 50px;
  margin-right: 5px;
`;

const BigForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 5px;
    height: 30px;
    text-align: center;
  }
  button {
    margin-bottom: 5px;
    height: 30px;
    border-radius: 4px;
    background-color: black;
    color: white;
  }
`;

const BigTitle = styled.h4`
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -1px;
  margin-bottom: 10px;
`;

const CloseBtn = styled.button`
  margin-bottom: 5px;
  height: 30px;
  border-radius: 4px;
`;
