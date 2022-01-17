/* eslint-disable require-jsdoc */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes, {InferProps} from 'prop-types';
import UserForm from './component/UserForm';
import {IAppState} from '../../interfaces/IRootState';
import {IUserReducer} from '../../interfaces/IReducer';
import Centered from '../../components/centered';
import Container from '../../components/container';
import {setCookie} from '../../utils/cookies';
import {Navigate} from 'react-router-dom';
import {isAuthenticated} from '../../utils/auth';

function Auth(props: InferProps<typeof Auth.propTypes>) {
  const [success, setSuccess] = useState(false);
  const isLogin: boolean = props.type === 'login';

  useEffect(() => {
    const data: IUserReducer = isLogin ?
    props.loginUserReducer : props.registerUserReducer;
    if (data.response?.token) {
      setCookie('username', data.response.username || '', 60);
      setCookie('token', data.response.token, 60);
      setSuccess(true);
    }
  }, [isLogin, props.loginUserReducer, props.registerUserReducer]);

  return (
       isAuthenticated() || success ? <Navigate to="/talks" /> : (
       <Container>
         <Centered>
           <UserForm type={props.type} dispatch={props.dispatch} />
         </Centered>
       </Container>
  ));
}

Auth.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loginUserReducer: PropTypes.object.isRequired,
  registerUserReducer: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = ( state: IAppState, _ownProps: any = {} ) => ({
  loginUserReducer: state.loginUserReducer,
  registerUserReducer: state.registerUserReducer,
});

export default connect(mapStateToProps)(Auth);
