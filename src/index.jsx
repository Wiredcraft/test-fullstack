import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import theme from './constants/theme';

import { GlobalContainer } from './components/global-container';
// import { TalksPage } from './pages/talks';
import { SignInPage } from './pages/sign-in';

import 'normalize.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalContainer>
        {/* <TalksPage /> */}
        <SignInPage />
      </GlobalContainer>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
