import React from 'react';
import './styles/App.scss';
import { Router } from '@reach/router';

import Layout from './Layout';
import Talks from './pages/Talks';
import NewTalk from './pages/NewTalk';
import FirebaseAuth from './components/FirebaseAuth';

const App = () => {

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
