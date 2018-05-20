import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Router from './components/Router';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar/>
          <Router/>
      </div>
    );
  }
}
export default App;
