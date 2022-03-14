import React from 'react'

import List from './views/list';
import Talk from './views/talk';

import {
  BrowserRouter, 
  Routes,
  Route
} from 'react-router-dom'

export default () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<List/>} />
      <Route path="talk" element={<Talk/>} />
    </Routes>
  </BrowserRouter>
)