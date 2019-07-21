import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//Custom Components
import Header from './Header';
import LinkList from './LinkList';
import CreateLink from './CreateLink';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <CreateLink />
        <LinkList />
      </>
    );
  }
}

export default App;
