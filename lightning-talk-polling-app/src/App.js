import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Router from './components/Router/Router';

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
