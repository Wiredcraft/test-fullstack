import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
//
import rootReducers from './reducer';
import initStates from './initStates';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducers(rootReducers), initStates, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
