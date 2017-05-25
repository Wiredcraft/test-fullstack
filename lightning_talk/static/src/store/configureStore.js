import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { router, History } from 'middleware/route'
import { navigate } from 'actions/route'

import reducers from 'reducers'

export default function configureStore () {
  let store = createStore(reducers, applyMiddleware(router(History), thunk))

  if (process.env.NODE_ENV === 'development') {
    store = createStore(reducers, applyMiddleware(router(History), thunk, createLogger({ collapsed: true })))
  }

  if (module.hot) {
    module.hot.accept('reducers', () => store.replaceReducer(require('reducers').default))
  }

  store.dispatch(navigate(window.location.href))

  return store
}
