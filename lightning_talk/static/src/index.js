import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import configureStore from 'store/configureStore'
import App from 'components/App'

const store = configureStore()
const root = document.getElementById('root')

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    root
  )

render(App)

if (module.hot) {
  module.hot.accept('components/App', () => render(App))
}
