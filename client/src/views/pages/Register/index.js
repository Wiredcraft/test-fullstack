import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, change } from 'redux-form';
// Import material-ui

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(change('authReg', 'authType', 'register'));
  }

  renderTextField = ({ input, label, type, meta: { touched, error } }) =>
    <div>
      <label>
        {label}
      </label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched &&
          error &&
          <span>
            {error}
          </span>}
      </div>
    </div>

  render() {
    const { pristine, submitting, handleSubmit, dispatch, reset } = this.props;
    return (
      <div>
        <form id='auth-user-form' onSubmit={handleSubmit}>
          <Field id='name'
            type='text'
            name='name'
            label='Username'
            component={this.renderTextField}
            autoFocus={true}
          />
          <Field id='password'
            type='password'
            name='password'
            label='Password'
            component={this.renderTextField}
          />
          <div>
            <button type="submit" disabled={submitting}>
              Sign Up
            </button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    )
  }
}

Register.propTypes = {
  authUser: PropTypes.func.isRequired,
}

Register = reduxForm({
  form: 'authReg',
  fields: ['register', 'name', 'password'],
  touchOnChange: true,
  validate: (values, props) => {
    const errors = {};
    const authType = 'register';
    const name = values.name;
    const password = values.password;

    if (!name || (!!name && (typeof name !== 'string' || name.trim() === ''))) {
      errors.name = '* Required';
    } else if ((authType === 'register') && !(/^\S{6,20}$/.test(name.trim()))) {
      errors.name = '* Must be between 6 to 20 characters';
    }
    if (!password || (!!password && (typeof password !== 'string' || password.trim() === ''))) {
      errors.password = '* Required';
    } else if (authType === 'register') {
      if (!(/^\S{6,20}$/i.test(password.trim()))) {
        errors.password = '* Must be between 6 to 20 characters';
      } else if (!(/(?=.[a-z])(?=.*[A-Z])/i.test(password))) {
        errors.password = '* Must contain at least one lowercase and uppercase letter.';
      } else if (!(/^((?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,20})$/i.test(password))) {
        errors.password = '* Must contain at least one numeric digit and a special character.';
      };
    }

    return errors;
  },
  onSubmit: (values, dispatch, props) => new Promise((resolve, reject) => props.authUser({ ...values }, { resolve, reject })),
  onSubmitSuccess: (result, dispatch, props) => console.log(result)
})(Register);

export default connect(
  state => ({
    authedUserState: state.users.authedUser
  }), null)(Register);
