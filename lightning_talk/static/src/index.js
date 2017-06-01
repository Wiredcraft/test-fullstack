import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import configureStore from 'store/configureStore'
import App from 'components/App'

const store = configureStore()
const root = document.getElementById('root')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
)

if (module.hot) {
  module.hot.accept('components/App', () => {
    render(
      <AppContainer>
        <Provider store={store}>
          <App />
        </Provider>
      </AppContainer>,
      root
    )
  })
}
