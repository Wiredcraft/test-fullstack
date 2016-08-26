import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Icon from './Icon';

const UserNav = ({ username }) => {
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
        <button>Logout</button>
      </div>
    </div>
  );
};

UserNav.propTypes = {
  username: PropTypes.string,
};

export default UserNav;
