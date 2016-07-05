import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/Reducers';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import DevTools from '../containers/DevTools';

const reducer = combineReducers({
    root: rootReducer,
    routing: routerReducer
});

const logger = createLogger({
    stateTransformer(state) {
        return state.root.toJS();
    }
});

const middleware = routerMiddleware(browserHistory);

const enhancer = compose(
    applyMiddleware(thunk, logger, middleware),
    DevTools.instrument()
);

export default function configureStore(initialState) {
    return createStore(reducer, initialState, enhancer);
}