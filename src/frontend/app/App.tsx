import * as React from 'react'
import { Route, Switch } from 'react-router'
import HomePage from './pages/HomePage'
import { hot } from 'react-hot-loader'
import Toast from './components/Toast'
import { Reset } from './components/globalStyle'

export const App = hot(module)(() => (
  <div>
    <Reset />
    <Switch>
      <Route path='/' component={HomePage} />
    </Switch>
    <Toast />
  </div>
))
