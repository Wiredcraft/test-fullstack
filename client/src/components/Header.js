import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import logo from '../assets/logo.png';
import LogInOrOut from '../components/LogInOrOut';

const Header = ({ children }) => {

  const [ minimized, setMinimized ] = useState(false);

  const calcScrollTop = () => {
    setMinimized(
      (document.body.scrollTop || document.documentElement.scrollTop) > 100
    );
  };

  useEffect(() => {
    window.addEventListener('scroll', calcScrollTop);

    return function cleanup() {
      window.removeEventListener('scroll', calcScrollTop);
    };
  }, []);

  return (
    <header className={minimized ? 'minimized' : null}>
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
