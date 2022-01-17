/* eslint-disable no-undef */
import React, {ReactElement} from 'react';
import {connect} from 'react-redux';
import Auth from './views/Auth';
import Navbar from './components/Navbar';
import {IState} from './interfaces/IState';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Talks from './views/Talks';
import PrivateRoute from './components/privateRoute';
import {isAuthenticated} from './utils/auth';

/**
 * The main Application component.
 * @return {React.ReactElement} Application
 */
function App(): ReactElement {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={
          isAuthenticated() ?
          <Navigate to="/login" /> :
          <Navigate to="/talks" />
        } />
        <Route path="/talks" element={
          <PrivateRoute>
            <Talks />
          </PrivateRoute>
        } />
        <Route path="/login" element={ <Auth type="login" />} />
        <Route path="/register" element={ <Auth type="register" />} />
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = (_state: IState) => ({});

export default connect(mapStateToProps)(App);
