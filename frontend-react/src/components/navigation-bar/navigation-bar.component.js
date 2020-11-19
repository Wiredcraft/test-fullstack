import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './navigation-bar.component.css';
import { UserContext } from '../../contexts/user';
import AuthService from '../../services/auth.service';

function NavigationBar() {
  const [currentUser, setCurrentUser] = useContext(UserContext);

  const logout = (event) => {
    event.preventDefault();
    AuthService.logout();
    setCurrentUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary" id="navbar1">
      <div className="container-fluid">
        <a className="navbar-brand mr-5 mb-1 mt-0" href="/">LightningTalk</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse justify-content-center" id="collapsingNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            { currentUser
              ? <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" id="navbarDd" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {currentUser.username}
                  </span>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDd">
                    <a className="dropdown-item px-2"
                        href="#/"
                        onClick={logout}>Logout</a>
                  </div>
                </li>
              : <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;

