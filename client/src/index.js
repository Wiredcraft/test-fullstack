import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import reducers from './reducers';
import News from './components/news/news.component';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <Switch>
                <Route path="/news" component={News}/>
                <Redirect from="/" exact to="/news"/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('container'));

registerServiceWorker();
