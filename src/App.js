import React, { Component } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import TalkList from './components/pages/TalkList';
import Header from './components/layout/Header';
import SignUpLogin from './components/pages/Signup-Login';

import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <div className="container">
            <Header />
            <br />
            <Routes>
              <Route path="/" element={<TalkList/>} />
              <Route path="/user" element={<SignUpLogin/>} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;