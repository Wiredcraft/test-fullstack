import React from 'react';
import {NavLink} from 'react-router-dom';

import './index.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">
        <img
          src={'/res/logo-white.svg'}
          alt="Lightning Talk Poll Logo"
          style={{
            paddingLeft: '1.25rem',
            marginTop: '0.625rem',
            marginBottom: '0.625rem',
          }}
          width={175} />
      </NavLink>
      <ul className="nav-links">
        <li className="nav-item">
          <NavLink to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/register">Register</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
