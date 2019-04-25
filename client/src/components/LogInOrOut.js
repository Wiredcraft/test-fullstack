import React, { useContext } from 'react';
import UserContext from './UserContext';
import Spinner from './Spinner';

import { LOADING, LOADED } from '../utils/loadingStatuses';

const LogInOrOut = () => {

  const { user, setUser, firebaseLoadStatus } = useContext(UserContext);

  const logout = e => {
    e.preventDefault();
    window.localStorage.removeItem('user');

    setUser(null);
  };

  const notLoaded = firebaseLoadStatus !== LOADED;

  return (
    <div className='log-in-or-out'>
      {firebaseLoadStatus === LOADING && <Spinner scale={0.5} />}
      <button className='styled-link' onClick={logout} hidden={!user || notLoaded}>Logout</button>
      <div id='firebaseui-auth-container' hidden={!!user || notLoaded} />
    </div>
  );
}

export default LogInOrOut;
