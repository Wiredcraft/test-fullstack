import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, change } from 'redux-form';

import { Form, FormGroup } from '../../../scss/form'

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(change('authLogin', 'authType', 'login'));
  }

  renderTextField = ({ input, label, type, meta: { touched, error } }) =>
    <FormGroup>
      <label>
        {label}
      </label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched &&
          error &&
          <p>
            {error}
          </p>}
      </div>
    </FormGroup>

  render() {
    const { pristine, submitting, handleSubmit, dispatch, reset } = this.props;
    return (
      <form id='auth-user-login' onSubmit={handleSubmit}>
        <Field id='loginIn'
          type='text'
          name='name'
          label='Username'
          component={this.renderTextField}
          autoFocus={true}
        />
        <Field id='loginPwd'
          type='password'
          name='password'
          label='Password'
          component={this.renderTextField}
        />
        <div>
          <button type="submit" disabled={submitting}>
            Login in
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Reset
          </button>
        </div>
      </form>
    )
  }
}

Login.propTypes = {
  authUser: PropTypes.func.isRequired,
}

Login = reduxForm({
  form: 'authLogin',
  fields: ['login', 'name', 'password'],
  touchOnChange: true,
  validate: (values, props) => {
    const errors = {};
    const authType = 'login';
    const name = values.name;
    const password = values.password;

    if (!name || (!!name && (typeof name !== 'string' || name.trim() === ''))) {
      errors.name = '* Required';
    } 
    if (!password || (!!password && (typeof password !== 'string' || password.trim() === ''))) {
      errors.password = '* Required';
    }
    return errors;
  },
  onSubmit: (values, dispatch, props) => new Promise((resolve, reject) => props.authUser({ ...values }, { resolve, reject })),
  onSubmitSuccess: (result, dispatch, props) => console.log(result)
})(Login);

export default connect(
  state => ({
    authedUserState: state.users.authedUser
  }), null)(Login);
