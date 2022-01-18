import {IAppState, IOwnProps} from 'src/interfaces/IRootState';
import React, {ReactElement, useEffect} from 'react';
import {checkCookie, clearCookie} from '../../../utils/cookies';
import {Navigate} from 'react-router';
import PropTypes from 'prop-types';
import clearNetworkRequests from '../../../utils/clearNetworkRequests';
import {connect} from 'react-redux';
import {userLoggedOutAction} from '../../../actions/user';

/**
 * Handle the logout action by clearing cookies and Redux states.
 * It redirects to /login when the user is logged out.
 * @param {IAppState} props
 * @param {AppDispatch} props.dispatch - Dispatch actions to the store
 * @param {IUserState} props.userReducer - User reducer
 * @return {ReactElement}
 */
function Logout(props: any): ReactElement {
  useEffect(() => {
    if (checkCookie()) {
      clearCookie('id');
      clearCookie('token');
      clearCookie('username');
      clearNetworkRequests(props);
      props.dispatch(userLoggedOutAction());
    }
  }, [props]);

  return (
    props.userReducer.isLoggedIn ?
    <Navigate to="/login" /> :
    <div>Logging out...</div>
  );
}


Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ( state: IAppState, _ownProps: IOwnProps) => {
  return {
    userReducer: state.userReducer,
    apiLoginUserReducer: state.apiLoginUserReducer,
    apiRegisterUserReducer: state.apiRegisterUserReducer,
  };
};

export default connect(mapStateToProps)(Logout);

