import './index.css';
import React, {ReactElement} from 'react';
import {IAppState} from '../../interfaces/IRootState';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

/**
  * The navbar component.
  * If the user is not authenticated, display Login and Register,
  * otherwise display the Logout button.
  * @param {Props} props
  * @param {IUserState} props.userReducer - User reducer
  * @return {ReactElement}
 */
function Navbar(props: { userReducer: { isLoggedIn: boolean } }): ReactElement {
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
}


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: IAppState) => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps)(Navbar);
