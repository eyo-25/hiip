import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/GlobalStyle";
import { GlobalFont } from "./styles/GlobalFont";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <GlobalFont />
    <GlobalStyle />
    <App />
  </RecoilRoot>
);
