import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducers from 'reducers'

export default function configureStore() {
  let store = createStore(reducers, undefined, compose(applyMiddleware(thunk), autoRehydrate()))

  if (process.env.NODE_ENV === 'development') {
    store = createStore(
      reducers,
      undefined,
      compose(applyMiddleware(thunk, createLogger({ collapsed: true })), autoRehydrate())
    )
  }

  if (module.hot) {
    module.hot.accept('reducers', () => store.replaceReducer(require('reducers').default))
  }

  persistStore(store, { whitelist: ['user'] })

  return store
}
