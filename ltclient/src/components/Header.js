import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Icon from './Icon';

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

const Header = (props) => {
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/">LT</Link>
      </div>
      <UserNav {...props} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    username: state.user.username,
  };
}

export default connect(mapStateToProps)(Header);
