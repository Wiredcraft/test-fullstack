import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { HeaderContainer } from '../../../scss/header';

const Header = props => {
  const { logoutUser, authedUser } = props;

  return (
    <HeaderContainer>
      <Link to='/'>Lightning Talk</Link>
        {
          !!authedUser ? (
              <Link to='/new'>New</Link>
          ) : (<span></span>)
        }
        {
          !!authedUser ? (
            <a>
              <span>{authedUser.name}</span>
              <button onClick={logoutUser}>Logout</button>
            </a>
          ) : (
            <Link to='/login'>Sign in</Link>
          )
        }
    </HeaderContainer>
  )
}

Header.contextTypes = {
  router: PropTypes.object,
};

// Header.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   authedUser: PropTypes.shape({
//     name: PropTypes.string
//   })
// };
const mapStateToProps = (state) => ({
    authedUser: state.users.authedUser.user
})

export default connect(mapStateToProps, null)(Header);
