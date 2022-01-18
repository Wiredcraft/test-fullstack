import React, {ReactElement, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes, {InferProps} from 'prop-types';
import UserForm from './component/UserForm';
import {IAppState, IOwnProps} from '../../interfaces/IRootState';
import Centered from '../../components/centered';
import Container from '../../components/container';
import {setCookie} from '../../utils/cookies';
import {Navigate} from 'react-router-dom';
import {IUserState} from '../../interfaces/IUser';

/**
 * Page which display the login or register form.
 * If the user is already authenticated, redirect to the Talks page.
 * @param {Object} props
 * @param {AppDispatch} props.dispatch - Dispatch actions to the store
 * @param {IUserState} props.userReducer - User reducer
 * @param {string} props.type - `login` or `register`
* @return {ReactElement}
 */
function Auth(props: InferProps<typeof Auth.propTypes>): ReactElement {
  useEffect(() => {
    const userReducer: IUserState = props.userReducer as IUserState;
    const isLoggedIn = userReducer.isLoggedIn;

    if (
      isLoggedIn &&
      userReducer.id &&
      userReducer.username &&
      userReducer.token
    ) {
      setCookie('id', userReducer.id, 60);
      setCookie('username', userReducer.username, 60);
      setCookie('token', userReducer.token, 60);
    }
  }, [props.userReducer]);

  return (
    (props.userReducer as IUserState).isLoggedIn ? <Navigate to="/talks" /> : (
       <Container>
         <Centered>
           <UserForm type={props.type} dispatch={props.dispatch} />
         </Centered>
       </Container>
  ));
}

Auth.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userReducer: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = ( state: IAppState, _ownProps: IOwnProps) => ({
  userReducer: state.userReducer,
});

export default connect(mapStateToProps)(Auth);
