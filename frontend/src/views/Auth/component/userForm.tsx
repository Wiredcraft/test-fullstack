/* eslint-disable require-jsdoc */

import './index.css';

import {IPayload} from 'src/interfaces/IRequest';
import {IUserFormEvent} from 'src/interfaces/IUserFormEvent';
import authentication from '../../../actions/authentication';
import Button from '../../../components/button';
import PropTypes, {InferProps} from 'prop-types';
import React from 'react';

function UserForm(props: InferProps<typeof UserForm.propTypes>) {
  const handleSubmit = (event: React.FormEvent<IUserFormEvent>) => {
    event.preventDefault();

    const elements = event.currentTarget.elements;

    const data: IPayload = {
      username: elements.username.value,
      password: elements.password.value,
    };

    props.dispatch(
      props.type === 'login' ?
      authentication.login.loginUserAction(data) :
      authentication.register.registerUserAction(data),
    );
  };

  return (
    <form className='auth-form' onSubmit={handleSubmit}>

      <h1 className='center-text'>
        {props.type === 'login' ? 'Login' : 'Register'}
      </h1>

      <div className="form-group">
        <label>Username</label>
        <input type="text" id="username" />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" id="password" />
      </div>

      <div className='flex-reverse'>
        <Button type="submit">
          Submit
        </Button>
      </div>

    </form>
  );
}

UserForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default UserForm;
