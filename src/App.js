import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/header';

import './App.css';

const App = () => (
  <div className="App">
    <Header />
    <Outlet />
  </div>
);

export default App;
