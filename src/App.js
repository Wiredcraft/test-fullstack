import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/header';
import Content from './components/content';

import './App.css';

const App = () => (
  <div className="App">
    <Header />
    <Content />
    <Outlet />
  </div>
);

export default App;
