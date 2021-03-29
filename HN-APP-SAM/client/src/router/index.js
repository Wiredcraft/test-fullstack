import Login from '@/components/Login'
import News from '@/components/News'
import Signup from '@/components/Signup'
import Detail from '@/components/Detail'
import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createHashHistory } from 'history'
import { getToken } from '@/utils/auth'

// export singleton for axios interceptor
export const history = createHashHistory()

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

class RouterConfig extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/news" />} />
          <PrivateRoute path="/news" component={News} />
          <PrivateRoute path="/detail" component={Detail} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/*" component={() => <h1>404</h1>} />
        </Switch>
      </Router>
    )
  }
}
export default RouterConfig
