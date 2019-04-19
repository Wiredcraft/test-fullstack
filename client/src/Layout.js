import React from 'react';
import Header from './components/Header';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <main>{ children }</main>
      <footer></footer>
    </React.Fragment>
  );
}

export default Layout;
