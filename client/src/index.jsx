import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import theme from './constants/theme';

import { GlobalContainer } from './components/global-container';
import { Header } from './components/header';
import { FilterBar } from './components/filter-bar';
import { TalkCard } from './components/talk-card';

import 'normalize.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalContainer>
        <Header />
        <FilterBar />
        <TalkCard />
      </GlobalContainer>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
