import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRouter() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
