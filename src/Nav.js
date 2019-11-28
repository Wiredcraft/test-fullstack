import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'

function Nav() {
  const navStyle = {
    color: 'black'
  };

  return (
    <nav >
      <h3>HackerNews</h3>
      <ul className="nav-links">
        <Link style={navStyle} to='/shop'>
          <li>Home</li>
        </Link> |
        <Link style={navStyle} to='/about'>
          <li>New</li>
        </Link> |
        <Link style={navStyle} to='/about'>
          <li>Past</li>
        </Link> |
        <Link style={navStyle} to='/about'>
          <li>Comments</li>
        </Link> |
        <Link style={navStyle} to='/about'>
          <li>Ask</li>
        </Link> |
        <Link style={navStyle} to='/about'>
          <li>Show</li>
        </Link> |
        <Link style={navStyle} to='/about'>
          <li>Jobs</li>
        </Link> |
        <Link style={navStyle} to='/about'>
          <li>Submit</li>
        </Link>
      </ul>
      <Link style={navStyle} to='/shop'>
        <p className="login">Login</p>
      </Link>
    </nav>
  );
}

export default Nav;
