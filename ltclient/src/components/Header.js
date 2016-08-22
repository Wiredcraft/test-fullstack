import React from 'react';
import { Link } from 'react-router';

import Icon from './Icon';

const UserNav = ({ logedin }) => {
  if(logedin) {
    return (
      <div className="header__user">
        <Link to="login">login</Link>
      </div>
    );
  } else {
    return (
      <div className="header__user">
        <div className="header__usernav">
          <span>john</span>
          <Icon name="expand" />
        </div>
        <div className="header__userdropdown">
          <a href="#">Logout</a>
        </div>
      </div>
    );
  }
};

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/">LT</Link>
      </div>
      <UserNav />
    </div>
  );
};

export default Header;