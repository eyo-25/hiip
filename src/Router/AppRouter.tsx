import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../Component/NavBar";
import Auth from "../pages/Auth/Auth";
import FeedBack from "../pages/FeedBack/FeedBack";
import Home from "../pages/Home/Home";
import Interval from "../pages/Home/Interval/Interval";
import MyPage from "../pages/MyPage/MyPage";
import Start from "../pages/Start/Start";

export default function AppRouter({ isLoggedIn }: { isLoggedIn: boolean }) {
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
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/plan/interval"} element={<Interval />} />
        <Route path={"/start"} element={<Start />} />
        <Route path={"/feedback"} element={<FeedBack />} />
        <Route path={"/mypage"} element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
