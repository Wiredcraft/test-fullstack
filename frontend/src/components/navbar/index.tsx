import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {IUserState} from 'src/interfaces/IUser';
import {IAppState} from '../../interfaces/IRootState';

import './index.css';

const Navbar = (props: {userReducer: IUserState}) => {
  return (
    <nav className="navbar">
      <NavLink to="/">
        <img
          src={'/res/logo-white.svg'}
          alt="Lightning Talk Poll Logo"
          style={{
            paddingLeft: '1.25rem',
            marginTop: '0.625rem',
            marginBottom: '0.625rem',
          }}
          width={175}
        />
      </NavLink>
      <ul className="nav-links">

        {props.userReducer.isLoggedIn ?
        <li className="nav-item">
          <NavLink to="/logout">Logout</NavLink>
        </li> :
        <React.Fragment>
          <li className="nav-item">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register">Register</NavLink>
          </li>
        </React.Fragment>
        }
      </ul>
    </nav>
  );
};


const mapStateToProps = (state: IAppState) => ({
  userReducer: state.userReducer,
});

export default connect(mapStateToProps)(Navbar);
