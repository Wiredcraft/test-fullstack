import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
import { Router, Route, Switch } from 'react-router'
import { Root } from './containers/Root'
import { TodoApp } from './containers/TodoApp'
import { TodoModel, TalkModel } from './models'
import { TodoStore, RouterStore, TalkStore, UserStore } from './stores'
import { STORE_TODO, STORE_ROUTER, STORE_TALK, STORE_USER } from './constants/stores'
import { TalkListContainer } from './containers/TalkList/index'
import { UserModel } from './models/UserModel'
import { TalkFormContainer } from './containers/TalkForm'
import { LoginFormContainer } from './containers/LoginForm/index'
import { RegisterFormContainer } from './containers/RegisterForm/index'

// enable MobX strict mode
useStrict(true)

// default fixtures for TodoStore
const defaultTodos = [
  new TodoModel('Use Mobx'),
  new TodoModel('Use React', true)
]

const defaultTalks = [
]

// prepare MobX stores
const history = createBrowserHistory()
const todoStore = new TodoStore(defaultTodos)
const routerStore = new RouterStore(history)
const talkStore = new TalkStore(routerStore, defaultTalks)
const userStore = new UserStore(routerStore)
const rootStores = {
  [STORE_TODO]: todoStore,
  [STORE_ROUTER]: routerStore,
  [STORE_TALK]: talkStore,
  [STORE_USER]: userStore
}

// render react DOM
ReactDOM.render(
  <Provider {...rootStores} >
    <Root>
      <Router history={history} >
        <Switch>
          <Route path='/todo-app' component={TodoApp} />
          <Route path='/new' component={TalkFormContainer} />
          <Route path='/login' component={LoginFormContainer} />
          <Route path='/register' component={RegisterFormContainer} />
          <Route path='/new' component={TalkFormContainer} />
          <Route path='/' component={TalkListContainer} />
        </Switch>
      </Router>
    </Root>
  </Provider >,
  document.getElementById('root')
)
