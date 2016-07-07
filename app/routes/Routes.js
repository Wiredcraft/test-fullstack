import React from 'react';
import { Router, Route } from 'react-router';
import NetworkUtility from '../utils/NetworkUtility';

// components
import AppContainer from '../containers/AppContainer';
import HomePage from '../components/container/HomePage';
import LoginPage from '../components/container/LoginPage';
import RegisterPage from '../components/container/RegisterPage';
import UserDetailPage from '../components/container/UserDetailPage';
import TalkPublishPage from '../components/container/TalkPublishPage';

export function createRouter(history) {
    return (
        <Router history={history}>
            <Route path={NetworkUtility.baseURI()} component={AppContainer}>
                <Route path="home" component={HomePage}/>
                <Route path="signin" component={LoginPage}/>
                <Route path="register" component={RegisterPage}/>
                <Route path="user/info" component={UserDetailPage}/>
                <Route path="publish" component={TalkPublishPage}/>
            </Route>
        </Router>
    );
}