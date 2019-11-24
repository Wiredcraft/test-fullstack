import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';

import { PrivateRoute } from './components/private-route';
import { TalksPage } from './pages/talks';
import { CreateTalk } from './pages/talks/create';
import { SignInPage } from './pages/sign-in';
import { NotFound } from './pages/not-found';

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <TalksPage />
        </Route>
        <Route path="/sign-in">
          <SignInPage />
        </Route>
        <PrivateRoute path="/talks/create">
          <CreateTalk />
        </PrivateRoute>
        <Route path="/talks">
          <Redirect to="/" />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
