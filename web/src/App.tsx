import React, { FC } from "react";
import { SWRConfig } from "swr";
import { BrowserRouter } from "react-router-dom";

import ThemeProvider from "./styles/ThemeProvider";
import GlobalStyle from "./styles/GlobalStyle";

import Header from "./components/bussiness/Header";
import ErrorBoundary from "./components/function/ErrorBoundary";

import request from "./utils/request";

import Routes from "./Routes";
import Store from "./store";

const App: FC = () => {
  return (
    <ErrorBoundary>
      <Store>
        <BrowserRouter>
          <ThemeProvider>
            <SWRConfig
              value={{
                fetcher: request
              }}
            >
              <GlobalStyle />
              <Header />
              <Routes />
            </SWRConfig>
          </ThemeProvider>
        </BrowserRouter>
      </Store>
    </ErrorBoundary>
  );
};

export default App;
