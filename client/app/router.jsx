import {Route, NotFoundRoute, Link, Router} from 'react-router';
import React, { Component, PropTypes } from 'react';
import history from './history'
import * as Pages from './pages';

export default class MyRouter extends Component {
  render() {
    return (
          <Router history={history}>
            <Route path="/" component={Pages.List} />
            <Route path="/auth" component={Pages.Auth} />
            <Route path="/submit" component={Pages.Submit} />
            <Route path="*" component={Pages.NotFound}/>
          </Router>
    );
  }
}
