import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Component/Header";
import NavBar from "../Component/NavBar";
import Auth from "../pages/Auth/Auth";
import FeedBack from "../pages/FeedBack/FeedBack";
import Home from "../pages/Home/Home";
import CreateProject from "../pages/Home/Interval/CreateProject";
import MyPage from "../pages/MyPage/MyPage";
import Start from "../pages/Start/Start";

interface AppRouterProps {
  isLoggedIn: boolean;
  userObj?: any;
}

export default function AppRouter({ isLoggedIn, userObj }: AppRouterProps) {
  if (!isLoggedIn) {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path={"/"} element={<Auth />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/* <Header /> */}
      <Routes>
        <Route path={"/"} element={<Home userObj={userObj} />}>
          <Route path={"/edit/:todoId"} element={<Home userObj={userObj} />} />
        </Route>
        <Route
          path={"/interval"}
          element={<CreateProject userObj={userObj} />}
        />
        <Route path={"/start"} element={<Start userObj={userObj} />}>
          <Route path={"/start/ready"} element={<Start userObj={userObj} />} />
        </Route>
        <Route path={"/feedback"} element={<FeedBack />} />
        <Route path={"/mypage"} element={<MyPage userObj={userObj} />}>
          <Route
            path={"/mypage/editprofile"}
            element={<MyPage userObj={userObj} />}
          />
        </Route>
      </Routes>
      <NavBar />
    </BrowserRouter>
  );
}
