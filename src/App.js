import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import './App.css';

const App = () => (
  <div className="App">
    <h1>Hello, World!</h1>
    <nav>
      <Link to="/hello">Hello</Link> <Link to="/world">World</Link>
    </nav>
    <Outlet />
  </div>
);

export default App;
