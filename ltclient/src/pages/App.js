import React, { PropTypes } from 'react';
// import { Link } from 'react-router';

import Icon from '../components/Icon';

const App = ({ children }) => (
  <div>
    <h1>LT</h1>
    {children}
    <footer>This is the humble footer</footer>
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
