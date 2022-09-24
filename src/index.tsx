import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/GlobalStyle";
import { GlobalFont } from "./styles/GlobalFont";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <GlobalFont />
      <GlobalStyle />
      <App />
    </RecoilRoot>
  </QueryClientProvider>
);
