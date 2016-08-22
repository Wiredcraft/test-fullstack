import React, { PropTypes } from 'react';
// import { Link } from 'react-router';

// import Icon from '../components/Icon';
import Header from '../components/Header';

const App = ({ children }) => (
  <div>
    <Header />
    {children}
    <footer>This is the humble footer</footer>
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
