import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../Component/Auth";
import FeedBack from "../pages/FeedBack";
import Home from "../pages/Home";
import MyPage from "../pages/MyPage";
import Start from "../pages/Start";

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
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/start "} element={<Start />} />
        <Route path={"/feedback"} element={<FeedBack />} />
        <Route path={"/mypage"} element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
