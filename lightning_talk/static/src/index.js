import { createElement as el } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import configureStore from 'store/configureStore'
import app from 'components/app'

const store = configureStore()
const root = document.getElementById('root')

render(el(Provider, { store }, el(app)), root)

if (module.hot) {
  module.hot.accept('components/app', () => {
    render(el(AppContainer, null, el(Provider, { store }, el(app))), root)
  })
}
