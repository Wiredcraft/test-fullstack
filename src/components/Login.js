import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';

export default class Login extends Component {
  state = {
    login: true, //Login or Signup
    email: '',
    password: '',
    name: ''
  };

  render() {
    return <div></div>;
  }
}
