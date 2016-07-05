import React from 'react';
import { Router, Route } from 'react-router';
import NetworkUtility from '../utils/NetworkUtility';

// components
import AppContainer from '../containers/AppContainer';
import App from '../components/App';

export function createRouter(history, store) {
    return (
        <Router history={history}>
            <Route path={NetworkUtility.baseURI()} component={AppContainer}>
                <Route path="app" component={App}/>
            </Route>
        </Router>
    );
}