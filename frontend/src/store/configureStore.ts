import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware, {SagaMiddleware} from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const configureStore = () => {
  const sagaMiddleware: SagaMiddleware<Object> = createSagaMiddleware();

  return {
    ...createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware),
        ),
    ),
    runSaga: sagaMiddleware.run(rootSaga),
  };
};

export default configureStore;
