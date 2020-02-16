import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Header = ({ username, logout }) => (
  <header className="header">
    <h1>
      <Link to="/">What&apos;s up</Link>
    </h1>
    <nav className="nav">
      {username ? (
        <span className="username">
          {username}
          <button onClick={logout} type="button" className="btn--text">logout</button>
        </span>
      ) : (
        <Link to="/login">login / register</Link>
      )}
      <Link to="/post">post</Link>
    </nav>
  </header>
);

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

const mapState = (state) => ({
  username: state.user.username,
});

const mapDispatch = ({ user: { logout } }) => ({
  logout,
});

export default connect(mapState, mapDispatch)(Header);
