import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducers from 'reducers'

export default function configureStore () {
  let store = createStore(reducers, applyMiddleware(thunk))

  if (process.env.NODE_ENV === 'development') {
    store = createStore(reducers, applyMiddleware(thunk, createLogger({ collapsed: true })))
  }

  if (module.hot) {
    module.hot.accept('reducers', () => store.replaceReducer(require('reducers').default))
  }

  return store
}
