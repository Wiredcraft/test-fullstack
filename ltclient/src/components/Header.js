import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions';

import Icon from './Icon';
import UserNav from './UserNav';
import Message from './Message';

const Header = ({ username, error, dispatchLogout }) => (
  <div className="header">
    <div className="header__inner">
      <div className="header__logo">
        <Link to="/">
          <Icon name="lt" />
        </Link>
      </div>
      <UserNav
        username={username}
        logout={dispatchLogout}
      />
    </div>
    <Message message={error} />
  </div>
);

Header.propTypes = {
  username: PropTypes.string,
  error: PropTypes.string,
  dispatchLogout: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    username: state.user.username,
    error: state.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchLogout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
