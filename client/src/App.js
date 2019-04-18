import React from 'react';
import './App.scss';
import Layout from './Layout';
import Talks from './Talks';
import NewTalk from './NewTalk';
import UserContext from './UserContext';
import { Router } from '@reach/router';

const App = (props) => {

  return (
    <UserContext.Provider value="User">
      <Layout>
        <Router>
          <Talks path='/' />
          <NewTalk path='/talks/new' />
        </Router>
      </Layout>
    </UserContext.Provider>
  );
};

export default App;
