import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/modules/user/user.api';

import './Navbar.scss';
import { toast } from './ToastManager';

export default () => {
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector((state) => state.user.loggedIn);

  const logOut = async () => {
    try {
      await dispatch(logout());
      toast.show({
        title: 'Logged out.',
        content: 'You have been successfully logged out.',
        type: 'success',
        duration: 3000
      });
    } catch (err) {
      console.log(err);
    }
  };

  let loginContent;

  if (!loginStatus) {
    loginContent = (
      <Link className="text-lg text-bold" to="/auth">
        Login
      </Link>
    );
  } else {
    loginContent = (
      <a href="#" onClick={logOut} className="text-lg text-bold">
        Logout
      </a>
    );
  }

  return (
    <nav className="navbar box-shadow bg-dark-blue text-white">
      <Link className="text-3xl text-bold" to="/">
        piorun
      </Link>
      <div>
        <Link className="text-lg text-bold mr-8" to="/add">
          Add Talk
        </Link>
        {loginContent}
      </div>
    </nav>
  );
};
