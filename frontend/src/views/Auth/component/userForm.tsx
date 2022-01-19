import {IAPIAuthPayload, IAPIAuthState} from '../../../interfaces/IAPI';
import PropTypes, {InferProps} from 'prop-types';
import React, {ReactElement, useEffect} from 'react';
import Button from '../../../components/button';
import Form from '../../../components/form';
import {IOwnProps} from '../../../interfaces/IRootState';
import {IUserFormEvent} from '../../../interfaces/IUserFormEvent';
import authentication from '../../../actions/api/authentication';
import {connect} from 'react-redux';

/**
 * User form for login and register actions.
 * @param {Object} props
 * @param {AppDispatch} props.dispatch - Dispatch actions to the store
 * @param {IAPIAuthState} props.apiLoginUserReducer - Login user reducer
 * @param {IAPIAuthState} props.apiRegisterUserReducer - Register user reducer
 * @param {string} props.type - `login` or `register`
 * @return {ReactElement}
 */
function UserForm(props: InferProps<typeof UserForm.propTypes>): ReactElement {
  const [message, setMessage] = React.useState('');

  useEffect(() => {
    const loginUserReducer: IAPIAuthState =
     props.apiLoginUserReducer as IAPIAuthState;
    const registerUserReducer: IAPIAuthState =
    props.apiRegisterUserReducer as IAPIAuthState;

    const errorMessage = props.type === 'login' ?
  loginUserReducer.error?.message :
  registerUserReducer.error?.message;

    setMessage(errorMessage || '');
  }, [
    props,
    props.type,
    props.apiLoginUserReducer,
    props.apiRegisterUserReducer,
  ]);


  const handleSubmit = (event: React.FormEvent<IUserFormEvent>): void => {
    event.preventDefault();

    const elements = event.currentTarget.elements;

    const data: IAPIAuthPayload = {
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
    <Form onSubmit={handleSubmit}>

      <h1 className='center-text'>
        {props.type === 'login' ? 'Login' : 'Register'}
      </h1>

      <div className="form-group">
        <label>Username</label>
        <input type="text" id="username" required pattern="[A-Za-z0-9]{1,20}" />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          id="password"
          required
          pattern="[A-Za-z0-9]{1,20}"/>
      </div>

      <div className='flex-reverse'>
        <Button type="submit">
          Submit
        </Button>
      </div>

      <p/>
      <div className='center-text' id='form-message'>
        {message}
      </div>

    </Form>

  );
}

UserForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  apiLoginUserReducer: PropTypes.object.isRequired,
  apiRegisterUserReducer: PropTypes.object.isRequired,
};


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: any, _ownProps: IOwnProps) => {
  return {
    apiLoginUserReducer: state.apiLoginUserReducer,
    apiRegisterUserReducer: state.apiLoginUserReducer,
  };
};


export default connect(mapStateToProps)(UserForm);
