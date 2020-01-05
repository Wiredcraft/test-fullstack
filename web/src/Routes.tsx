import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";

import * as ROUTES from "./constants/routes";

import PrivateRoute from "./components/function/PrivateRoute";

import Home from "./pages/Home";
import NewTalk from "./pages/NewTalk";
import Login from "./pages/Login";

const Routes: FC = () => (
  <Switch>
    <Route exact path={ROUTES.HOME}>
      <Home />
    </Route>
    <Route exact path={ROUTES.LOGIN}>
      <Login />
    </Route>
    <PrivateRoute exact path={ROUTES.NEW_TALK}>
      <NewTalk />
    </PrivateRoute>
    <Route>404 Not Found</Route>
  </Switch>
);

export default Routes;
