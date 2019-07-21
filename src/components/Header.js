import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Header extends Component {
  render() {
    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <div className="fw7 mr1">Wiredcraft | Hacker News</div>
          <Link className="ml1 no-underline black" to="/">
            New
          </Link>
          <div className="ml1">|</div>
          <Link className="ml1 no-underline black">Submit</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
