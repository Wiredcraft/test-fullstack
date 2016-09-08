import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import { loadState } from '../utils';

function loadUserState() {
  if (process.env.NODE_ENV !== 'production') return undefined;
  const state = loadState();
  const now = new Date();
  if (state && state.loginAt && (now - state.loginAt >= state.ttl * 1000)) {
    return undefined;
  }
  return state;
}

export default function configureStore() {
  const store = createStore(
    rootReducer,
    {
      user: loadUserState(),
    },
    applyMiddleware(thunkMiddleware, createLogger()),
  );

  /* eslint-disable */
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  /* eslint-enable */

  return store;
}
