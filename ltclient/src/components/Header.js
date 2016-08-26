import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import UserNav from './UserNav';
import Error from './Error';

const Header = ({ username, error }) => (
  <div className="header">
    <div className="header__logo">
      <Link to="/">LT</Link>
    </div>
    <Error message={error} />
    <UserNav username={username} />
  </div>
);

Header.propTypes = {
  username: PropTypes.string,
  error: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    username: state.user.username,
    error: state.error,
  };
}

export default connect(mapStateToProps)(Header);
