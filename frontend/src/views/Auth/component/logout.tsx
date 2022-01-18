import React, {ReactElement, useEffect} from 'react';
import {connect} from 'react-redux';
import {Navigate} from 'react-router';
import clearNetworkRequests from '../../../utils/clearNetworkRequests';
import {checkCookie, clearCookie} from '../../../utils/cookies';
import {userLoggedOutAction} from '../../../actions/user';
import {IAppState, IOwnProps} from 'src/interfaces/IRootState';
import PropTypes from 'prop-types';

/**
 * Handle the logout action by clearing cookies and Redux states.
 * It redirects to /login when the user is logged out.
 * @param {IAppState} props
 * @param {AppDispatch} props.dispatch - Dispatch actions to the store
 * @param {IUserState} props.userReducer - User reducer
 * @return {ReactElement}
 */
function Logout(props: IAppState): ReactElement {
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

const mapStateToProps = ( state: IAppState, _ownProps: IOwnProps) => ({
  userReducer: state.userReducer,
  apiLoginUserReducer: state.apiLoginUserReducer,
  apiRegisterUserReducer: state.apiRegisterUserReducer,
});

export default connect(mapStateToProps)(Logout);


