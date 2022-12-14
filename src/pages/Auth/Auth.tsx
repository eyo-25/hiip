import { useState } from "react";
import styled from "styled-components";
import AuthForm from "./component/AuthForm";
import AuthSocialLogin from "./component/AuthSocialLogin";
import { ReactComponent as HiipIcon } from "../../Assets/Icons/HIIPLogo.svg";

const Auth = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const onCreateClick = () => {
    setIsCreate((prev) => !prev);
  };
  const onLoginClick = () => {
    setIsLogin((prev) => !prev);
  };
  return (
    <>
      {isCreate && <AuthForm close={setIsCreate} newCount={true} />}
      {isLogin && <AuthForm close={setIsLogin} newCount={false} />}
      <Container>
        <AuthBox>
          <HiipLogo />
          <AuthSocialLogin />
          <BtnBox>
            <SubText>또는</SubText>
            <LoginBtn1 onClick={onCreateClick}>
              이메일 주소로 가입하기
            </LoginBtn1>
          </BtnBox>
          <BtnBox>
            <SubText>이미 HIIP 회원이 신가요?</SubText>
            <LoginBtn2 onClick={onLoginClick}>로그인</LoginBtn2>
          </BtnBox>
        </AuthBox>
      </Container>
    </>
  );
};

export default Auth;

export const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  max-width: 375px;
  height: 100vh;
  margin: 0 auto;
`;

const AuthBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  justify-content: center;
  align-items: center;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #c4c4c4;
    cursor: pointer;
    margin: 10px 0;
  }
`;

const LoginBtn1 = styled.button`
  background-color: black;
  color: white;
  &:hover {
    transition: 0.5s ease-in;
    color: #9d9d9d;
  }
`;

const LoginBtn2 = styled.button`
  font-weight: 600;
  background-color: inherit;
  &:hover {
    transition: 0.5s ease-in;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const HiipLogo = styled(HiipIcon)`
  display: flex;
  width: 80px;
  margin-bottom: 10px;
`;

const SubText = styled.div`
  font-size: 14px;
  color: #9d9d9d;
`;
