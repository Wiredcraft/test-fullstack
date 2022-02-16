import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.scss';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar box-shadow bg-dark-blue text-white">
        <Link className="text-3xl text-bold" to="/">piorun</Link>
        <div>
        <Link className="text-lg text-bold mr-8" to="/add">
          Add Talk
        </Link>
        <Link className="text-lg text-bold" to="/auth">
          Login
        </Link>
        </div>
      </nav>
    );
  }
}
