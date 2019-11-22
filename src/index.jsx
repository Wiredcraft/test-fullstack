import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import theme from './constants/theme';

import { GlobalContainer } from './components/global-container';
import { TalksPage } from './pages/talks';
import { SignInPage } from './pages/sign-in';
import { NotFound } from './pages/not-found';

import 'normalize.css';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/talks">
          <TalksPage />
        </Route>
        <Route path="/sign-in">
          <SignInPage />
        </Route>
        <Route path="/talks/create">"create..."</Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

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
