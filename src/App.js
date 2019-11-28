import React from 'react';
import './App.css';
import Nav from './Nav';
import About from './About';
import Shop from './Shop';
import ItemDetail from './ItemDetail';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route path='/' exact component={Shop} />
        <Route path='/about' component={About} />
        <Route path='/shop' exact component={Shop} />
        <Route path='/shop/:id' component={ItemDetail} />
      </div>
    </Router>
  );
}

// const Home = () => (
//   <div>
//     <h1>Home Page</h1>
//   </div>
// );

export default App;
