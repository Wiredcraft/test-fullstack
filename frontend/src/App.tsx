import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import PropTypes, {InferProps} from 'prop-types';
import React, {ReactElement, useEffect} from 'react';
import {checkCookie, getCookie} from './utils/cookies';
import Auth from './views/Auth';
import Centered from './components/centered';
import Container from './components/container';
import {IAppState} from './interfaces/IRootState';
import Logout from './views/Auth/component/logout';
import Navbar from './components/navbar';
import PrivateRoute from './components/privateRoute';
import TalkForm from './views/Talks/Talk/TalkForm';
import Talks from './views/Talks';
import {connect} from 'react-redux';
import {userInitAction} from './actions/user';

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
        <Route path="/talks/create" element={
          <PrivateRoute>
            <TalkForm type="create" />
          </PrivateRoute>
        } />
        <Route path="/talks/edit/:id" element={
          <PrivateRoute>
            <TalkForm type="edit" />
          </PrivateRoute>
        } />
        <Route path="/login" element={ <Auth type="login" />} />
        <Route path="/register" element={ <Auth type="register" />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={
          <Container>
            <Centered>
            404: page not found
            </Centered>
          </Container>
        } />
      </Routes>
    </BrowserRouter>
  );
}


App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (_state: IAppState) => {
  return {};
};

export default connect(mapStateToProps)(App);
