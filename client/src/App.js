import React from 'react';
import './App.scss';
import Layout from './Layout';
import Talks from './Talks';
import UserContext from './UserContext';
import { Router } from '@reach/router';

const App = (props) => {

  return (
    <UserContext.Provider value="User">
      <Layout>
        <Router>
          <Talks path='/' />
          {/*<EditTalk path='/talks/:id' />*/}
        </Router>
      </Layout>
    </UserContext.Provider>
  );
};

export default App;
