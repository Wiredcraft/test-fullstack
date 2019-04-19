import React, { useContext } from 'react';
import UserContext from './UserContext';

import firebase from 'firebase';
import firebaseui from 'firebaseui';

const LogInOrOut = () => {

  const { user, setUser } = useContext(UserContext);

  const logout = e => {
    e.preventDefault();
    window.localStorage.removeItem('user');

    setUser(null);
  };

  return (
    <div className='log-in-or-out'>
      <a href='#' onClick={logout} hidden={!user}>Logout</a>
      <div id='firebaseui-auth-container' hidden={user} />
    </div>
  );
}

export default LogInOrOut;
