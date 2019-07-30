import configureReducer from './configureReducer'
import configureMiddleware from './configureMiddleware'
import { applyMiddleware, createStore } from 'redux'

export default function configureStore (options: any) {
  const {
    platformMiddleware = [],
    apiRequest,
  } = options;

  const reducer = configureReducer(
  );

  const middleware = configureMiddleware(
    platformMiddleware,
    apiRequest,
  );

  const store = createStore(
    reducer,
    applyMiddleware(...middleware)
  );

  // Enable hot reload where available.
  if (module.hot) {

    const replaceReducer = (configureReducerFn: any) =>
      store.replaceReducer(configureReducerFn());

    module.hot.accept('./configureReducer', () => {
      replaceReducer(require('./configureReducer'));
    });
  }

  return store;
}
