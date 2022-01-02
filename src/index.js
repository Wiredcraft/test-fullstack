import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.js';
import Hello from './routes/hello';
import World from './routes/world';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="hello" element={<Hello />} />
        <Route path="world" element={<World />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
