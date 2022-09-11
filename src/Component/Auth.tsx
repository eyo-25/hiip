import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

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
      <div>
        <button>Google 계정으로 가입하기</button>
        <button>Github 계정으로 가입하기</button>
        <div>또는</div>
        <button onClick={onCreateClick}>이메일 주소로 가입하기</button>
      </div>
      <div>또는</div>
      <div>
        <h4>이미 HIIP 회원이 신가요?</h4>
        <button onClick={onLoginClick}>Log In</button>
      </div>
      {isCreate && <AuthForm close={setIsCreate} newCount={true} />}
      {isLogin && <AuthForm close={setIsLogin} newCount={false} />}
    </>
  );
};

export default Auth;
