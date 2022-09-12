import { useNavigate } from "react-router-dom";
import { authService } from "../../firebase";

const MyPage = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate(`/`);
  };
  return (
    <>
      <span onClick={onLogOutClick}>Log Out</span>
    </>
  );
};

export default MyPage;
