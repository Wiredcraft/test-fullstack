/* eslint-disable require-jsdoc */
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Navigate} from 'react-router';
import clearNetworkRequests from '../../../utils/clearNetworkRequests';
import {clearCookie} from '../../../utils/cookies';
import {userLoggedOutAction} from '../../../actions/user';
import {checkAuth} from '../../../utils/auth';
import {IAppState, IOwnProps} from 'src/interfaces/IRootState';
import PropTypes from 'prop-types';


function Logout(props: IAppState) {
  useEffect(() => {
    if (checkAuth()) {
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


