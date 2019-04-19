import React from 'react';
import './App.scss';
import { Router } from '@reach/router';

import Layout from './Layout';
import Talks from './Talks';
import NewTalk from './NewTalk';
import FirebaseAuth from './FirebaseAuth';

const App = (props) => {

  return (
    <FirebaseAuth>
      <Layout>
        <Router basepath={process.env.PUBLIC_URL}>
          <Talks path='/' />
          <NewTalk path='/talks/new' />
        </Router>
      </Layout>
    </FirebaseAuth>
  );
};

export default App;
