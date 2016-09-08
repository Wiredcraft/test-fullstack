import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Icon from './Icon';

const UserNav = ({ username, logout }) => {
  if (!username) {
    return (
      <div className="header__user">
        <Link to="login">login</Link>
      </div>
    );
  }
  return (
    <div className="header__user">
      <div className="header__usernav">
        <span>{username}</span>
        <Icon name="expand" />
      </div>
      <div className="header__userdropdown">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

UserNav.propTypes = {
  username: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

export default UserNav;
