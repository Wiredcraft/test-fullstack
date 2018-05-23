import React, { Component } from 'react';
import cssClass from './App.css';
import Navbar from './components/Navbar/Navbar';
import Router from './components/Router/Router';
import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <div className={cssClass}>
          <Navbar/>
          <Router/>
          <Footer/>
      </div>
    );
  }
}
export default App;
