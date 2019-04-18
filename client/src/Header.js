import React, { useContext } from 'react';
import UserContext from './UserContext';
import logo from './logo.png';

const Header = ({ children }) => {
  const user = useContext(UserContext);

  return (
    <header>
      <div className='header-content'>
        <div className='title-and-logo'>
          <img className='logo' src={logo} alt='' />
          <h1>Talk Lightning</h1>
        </div>
        <div>Hello {user}</div>
      </div>
    </header>
  );
}

export default Header;
