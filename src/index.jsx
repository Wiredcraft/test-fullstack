import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import 'normalize.css';

import theme from './constants/theme';

import { GlobalContainer } from './components/global-container';
import { AppRouter } from './router';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalContainer>
        <AppRouter />
      </GlobalContainer>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
