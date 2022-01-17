/* eslint-disable require-jsdoc */

import React from 'react';

import PropTypes, {InferProps} from 'prop-types';
import authentication from '../../../actions/authentication';
import {IUserFormEvent} from 'src/interface/IUserFormEvent';
import {IPayload} from 'src/interface/IRequest';

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
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type="text" id="username"/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" id="password"/>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

UserForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default UserForm;
