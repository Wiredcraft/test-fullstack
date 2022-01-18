import React, {ReactElement, useEffect} from 'react';
import {connect} from 'react-redux';
import Auth from './views/Auth';
import Navbar from './components/Navbar';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Talks from './views/Talks';
import PrivateRoute from './components/privateRoute';
import Logout from './views/Auth/component/logout';
import {userInitAction} from './actions/user';
import {checkCookie, getCookie} from './utils/cookies';
import PropTypes, {InferProps} from 'prop-types';
import {IAppState} from './interfaces/IRootState';

/**
 * Main application component.
 * This component handle the application routing, and will initialize
 * the userInitReducer if the user is authenticated.
 * @param {Object} props
 * @param {AppDispatch} props.dispatch - Dispatch actions to the store
 * @return {ReactElement}
 */
function App(props: InferProps<typeof App.propTypes>): ReactElement {
  useEffect(() => {
    const auth = checkCookie();
    const token = getCookie('token');
    const username = getCookie('username');
    const id = getCookie('id');

    if (auth) {
      props.dispatch(userInitAction({
        id,
        username,
        token,
        isLoggedIn: true,
      }));
    } else {
      props.dispatch(userInitAction({
        id: null,
        token: null,
        username: null,
        isLoggedIn: false,
      }));
    }
  });


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={
          checkCookie() ?
          <Navigate to="/login" /> :
          <Navigate to="/talks" />
        } />
        <Route path="/talks" element={
          <PrivateRoute>
            <Talks />
          </PrivateRoute>
        } />
        <Route path="/login" element={ <Auth type="login" />} />
        <Route path="/register" element={ <Auth type="register" />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}


App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (_state: IAppState) => ({});

export default connect(mapStateToProps)(App);
