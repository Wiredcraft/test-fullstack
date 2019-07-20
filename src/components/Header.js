import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Header extends Component {
  render() {
    return (
      <div>
        <h2>Hello from header</h2>
      </div>
    );
  }
}

export default withRouter(Header);
