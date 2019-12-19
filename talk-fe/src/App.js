import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { TalkListRouter, SubmitTalkRouter, LoginRouter } from './routers';
import store from './store';
import './App.scss';

store.dispatch({ type: 'talks/get' });

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/list">List</Link>
              </li>
              <li>
                <Link to="/create">new talk</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Redirect exact from="/" to="/list" />
            <Route path="/list">
              <TalkListRouter />
            </Route>
            <Route path="/create">
              <SubmitTalkRouter />
            </Route>
            <Route path="/login">
              <LoginRouter />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
