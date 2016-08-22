import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Icon from './Icon';
import Error from './Error';

const UserNav = ({ username }) => {
  if(!username) {
    return (
      <div className="header__user">
        <Link to="login">login</Link>
      </div>
    );
  } else {
    return (
      <div className="header__user">
        <div className="header__usernav">
          <span>{username}</span>
          <Icon name="expand" />
        </div>
        <div className="header__userdropdown">
          <a href="#">Logout</a>
        </div>
      </div>
    );
  }
};

UserNav.propTypes = {
  username: PropTypes.string,
};

const Header = ({ username, error }) => {
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/">LT</Link>
      </div>
      <Error message={error} />
      <UserNav username={username} />
    </div>
  );
};

Header.propTypes = {
  username: PropTypes.string,
  error: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    username: state.user.username,
    error: state.error
  };
}

export default connect(mapStateToProps)(Header);
