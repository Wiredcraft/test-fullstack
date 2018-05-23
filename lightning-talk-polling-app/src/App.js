import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Router from './components/Router/Router';
import Footer from './components/Footer/Footer';
import {BrowserRouter} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <Footer/>
            </div>
        </BrowserRouter>
    );
  }
}
export default App;
