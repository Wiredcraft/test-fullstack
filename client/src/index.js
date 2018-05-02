import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import reducers from './reducers';
import Talks from './components/talks/talks.component';
import Login from './components/login/login.component';
import PrivateRoute from './components/private-route/private-route.component';
import Submit from './components/submit/submit.component';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <Switch>
                <Route path="/talks" component={Talks}/>
                <Route path="/login" component={Login}/>
                <PrivateRoute path="/submit" component={Submit}/>
                <Redirect from="/" exact to="/talks"/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('container'));

registerServiceWorker();
