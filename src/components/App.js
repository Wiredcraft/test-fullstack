import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LinkList from './LinkList';

class App extends Component {
  render() {
    return <LinkList />;
  }
}

export default App;
