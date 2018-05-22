import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Router from './components/Router/Router';
import FooterCustom from './components/Footer/FooterCustom';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar/>
          <Router/>
          <FooterCustom/>
      </div>
    );
  }
}
export default App;
