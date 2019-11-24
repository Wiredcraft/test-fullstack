import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import 'normalize.css';

import theme from './constants/theme';
import { StoreProvider } from './store/store-provider';
import { GlobalContainer } from './components/global-container';
import { AppRouter } from './router';

const App = () => {
  // Display global error
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <GlobalContainer>
          <AppRouter />
        </GlobalContainer>
      </ThemeProvider>
    </StoreProvider>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
