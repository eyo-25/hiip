import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "../../../firebase";

const AuthSocialLogin = () => {
  const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    let provider: any;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };
  return (
    <>
      <button onClick={onSocialClick} name="google">
        Google 계정으로 로그인
      </button>
      <button onClick={onSocialClick} name="github">
        Github 계정으로 로그인
      </button>
    </>
  );
};

export default AuthSocialLogin;
