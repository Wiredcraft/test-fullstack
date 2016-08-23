import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />
  </Route>
);

export default routes;