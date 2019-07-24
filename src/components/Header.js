import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../constants';

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: '#fff',
              fontSize: '1.5rem'
            }}
          >
            <div className="fw7 mr1">Wiredcraft | Lightning Talks</div>
          </Link>
          {/* Hide submit button if no authToken */}
          {authToken && (
            <div className="flex">
              <div className="ml1" style={{ fontSize: '1.3rem' }}>
                |
              </div>
              <Link
                to="/create"
                className="ml1 no-underline black"
                style={{ fontSize: '1.3rem' }}
              >
                submit
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-fixed">
          {authToken ? (
            <div
              className="ml1 pointer white"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                this.props.history.push(`/`);
              }}
            >
              logout
            </div>
          ) : (
            <Link to="/login" className="ml1 no-underline white">
              login
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
