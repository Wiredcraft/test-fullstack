import React, { Component } from 'react';
import cssClass from './App.css';
import Navbar from './components/Navbar/Navbar';
import Router from './components/Router/Router';
import Footer from './components/Footer/Footer';

class App extends Component {
  //  we can use
    // <Navbar username: llll,>
    //video 086
    // we can use shouldcomponentupdate in nav and footer
    // cause side effect in componentDidupdate but dont update state. cause rerender
    // call shouldcomponentupdate in parent component, wether or not to reach child or not
    // use functinal setState for real time update 096
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
