import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Form from '../../components/Form/Form';
import * as SubmitActions from '../../actions/SubmitActions';
import * as RouteActions from '../../actions/RouteActions';
import { isLoggedIn } from '../../util/auth';

@connect(
  state => ({ auth: state.auth, submit: state.submit }),
  dispatch => bindActionCreators(SubmitActions, dispatch)
)
export default class SubmitContainer extends Component {

  _submit(data){
    if(!isLoggedIn(this.props.auth)) return;

    this.props.submitTopic({
      userId: this.props.auth.id,
      token: this.props.auth.authkey,
      data: data
    });
  }

  render() {
    console.log(this.props.auth.username)

    return (
      <div>
        <Form
            mode={'topic'}
            loading={this.props.submit.submitload}
            error={this.props.submit.submiterror}
            username={this.props.auth.username}
            btntxt={'CREATE'}
            submitTopic={(submitData) => this._submit(submitData)} />
      </div>
    );
  }
}
