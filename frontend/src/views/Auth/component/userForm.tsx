/* eslint-disable require-jsdoc */

import './index.css';

import {IUserFormEvent} from '../../../interfaces/IUserFormEvent';
import authentication from '../../../actions/api/authentication';
import Button from '../../../components/button';
import PropTypes, {InferProps} from 'prop-types';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {IAppState, IOwnProps} from '../../../interfaces/IRootState';
import {IAPIPayload, IAPIState} from '../../../interfaces/IAPI';

function UserForm(props: InferProps<typeof UserForm.propTypes>) {
  // @TODO: Error message, loading in form-message div

  useEffect(() => {
    const test: IAPIState = props.apiLoginUserReducer as IAPIState;

    console.log(test.error);
  }, [
    props.apiLoginUserReducer,
    props.apiRegisterUserReducer,
  ]);


  const handleSubmit = (event: React.FormEvent<IUserFormEvent>) => {
    event.preventDefault();

    const elements = event.currentTarget.elements;

    const data: IAPIPayload = {
      username: elements.username.value,
      password: elements.password.value,
    };

    props.dispatch(
      props.type === 'login' ?
      authentication.login.apiLoginUserAction(data) :
      authentication.register.apiRegisterUserAction(data),
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

      <p/>
      <div className='center-text' id='form-message' />

    </form>

  );
}

UserForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  apiLoginUserReducer: PropTypes.object.isRequired,
  apiRegisterUserReducer: PropTypes.object.isRequired,
};


const mapStateToProps = ( state: IAppState, _ownProps: IOwnProps) => ({
  apiLoginUserReducer: state.apiLoginUserReducer,
  apiRegisterUserReducer: state.apiLoginUserReducer,
});


export default connect(mapStateToProps)(UserForm);
