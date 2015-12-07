import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Header } from '../../components/index';
import * as AuthActions from '../../actions/AuthActions';
import * as RouteActions from '../../actions/RouteActions';
import { isLoggedIn } from '../../util/auth';

@connect(
  state => ({ auth: state.auth }),
  dispatch => bindActionCreators(AuthActions, dispatch)
)
export default class HeaderContainer extends Component {

  _goLogin(){
    RouteActions.go('/auth');
  }

  _goSubmit(){
    RouteActions.goOr(isLoggedIn(this.props.auth), '/submit', '/auth');
  }

  render() {

    return (
      <Header
        loggedIn={isLoggedIn(this.props.auth)}
        loginHandler={::this._goLogin}
        logoutHandler={this.props.logout}
        submitHandler={::this._goSubmit}
         />
    );
  }
}
