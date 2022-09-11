import { RecoilRoot } from "recoil";
import App from "./App";
import Reset from "./styles/Reset";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <RecoilRoot>
    <Reset />
    <App />
  </RecoilRoot>,
  document.getElementById("root")
);
