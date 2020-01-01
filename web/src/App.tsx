import React, { FC } from "react";
import ThemeProvider from "./styles/ThemeProvider";
import GlobalStyle from "./styles/GlobalStyle";

const App: FC = () => {
  return (
    <ThemeProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
