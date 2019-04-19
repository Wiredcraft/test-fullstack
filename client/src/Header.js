import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import logo from './logo.png';
import LogInOrOut from './LogInOrOut';

const Header = ({ children }) => {

  const [ top, setTop ] = useState(document.body.scrollTop);

  const calcScrollTop = () => {
    setTop(document.body.scrollTop || document.documentElement.scrollTop);
    // console.log(top)
  };

  useEffect(() => {
    window.addEventListener('scroll', calcScrollTop);

    return function cleanup() {
      window.removeEventListener('scroll', calcScrollTop);
    };
  }, []);

  return (
    <header className={`${top > 100 ? 'minimized' : ''}`}>
      <div className='header-content body-container'>
        <Link to={`${process.env.PUBLIC_URL}/`} className='title-and-logo'>
          <img className='logo' src={logo} alt='' />
          <h1>Talk Lightning</h1>
        </Link>
        <LogInOrOut />
      </div>
    </header>
  );
}

export default Header;
