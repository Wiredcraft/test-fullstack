import React, { useContext } from 'react';
import UserContext from './UserContext';

const LogInOrOut = () => {

  const { user, setUser } = useContext(UserContext);

  const logout = e => {
    e.preventDefault();
    window.localStorage.removeItem('user');

    setUser(null);
  };

  return (
    <div className='log-in-or-out'>
      <button className='styled-link' onClick={logout} hidden={!user}>Logout</button>
      <div id='firebaseui-auth-container' hidden={!!user} />
    </div>
  );
}

export default LogInOrOut;
