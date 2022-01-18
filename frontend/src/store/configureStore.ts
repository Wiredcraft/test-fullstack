import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware, {SagaMiddleware} from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

/**
  * Configure Redux Saga store.
  * @return {Store} Redux Saga store.
 */
function configureStore(): any {
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
}

export default configureStore;
