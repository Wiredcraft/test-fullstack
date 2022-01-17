/* eslint-disable no-undef */
import React, {ReactElement} from 'react';
import {connect} from 'react-redux';
import Auth from './views/Auth';
import Navbar from './components/Navbar';
import {IState} from './interfaces/IState';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Centered from './components/centered';
import Container from './components/container';

/**
 * The main Application component.
 * @return {React.ReactElement} Application
 */
function App(): ReactElement {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <Container>
            <Centered>Please login or register to proceed.</Centered>
          </Container>
        } />
        <Route path="/login" element={ <Auth type="login" />} />
        <Route path="/register" element={ <Auth type="register" />} />
      </Routes>
    </Router>
  );
}

const mapStateToProps = (_state: IState) => ({});

export default connect(mapStateToProps)(App);
