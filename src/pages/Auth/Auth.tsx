import { useState } from "react";
import styled from "styled-components";
import AuthForm from "./component/AuthForm";
import AuthSocialLogin from "./component/AuthSocialLogin";
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
      <AuthBox>
        <AuthSocialLogin />
        <div>
          <div>또는</div>
          <button onClick={onCreateClick}>이메일 주소로 가입하기</button>
        </div>
        <div>또는</div>
        <div>
          <h4>이미 HIIP 회원이 신가요?</h4>
          <button onClick={onLoginClick}>Log In</button>
        </div>
      </AuthBox>
    </>
  );
};

export default Auth;

const AuthBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;
