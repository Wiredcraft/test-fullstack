import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Layout from './components/layout';
import Home from './containers/home';
import Login from './containers/login';
import EditPoll from './containers/editPoll';
import Register from './containers/register';

function App(): JSX.Element {

  return (
    <Layout>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path={"/login"} exact={true} component={Login} />
        <Route path={"/register"} exact={true} component={Register} />
        <Route path={"/addPost"} exact={true} component={EditPoll} />
        <Route path={"/editPost/:pollId"} exact={true} component={EditPoll} />
      </Switch>
    </Layout>
  );
}

export default App;
