/* eslint-disable no-undef */
import React, {ReactElement} from 'react';
import {connect} from 'react-redux';
import Auth from './components/Auth';
import {IState} from './interface/IState';

/**
 * The main Application component.
 * @return {React.ReactElement} Application
 */
function App(): ReactElement {
  return (
    <div>
      <h1>你好，世界</h1>
      <h2>Login</h2>
      <Auth type='login' />
      <h2>Register</h2>
      <Auth type='register' />
    </div>
  );
}

const mapStateToProps = (_state: IState) => ({});

export default connect(mapStateToProps)(App);
