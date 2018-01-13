import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
import { Router, Route, Switch } from 'react-router'
import { Root } from './containers/Root'
import { TodoApp } from './containers/TodoApp'
import { TodoModel, TalkModel } from './models'
import { TodoStore, RouterStore, TalkStore } from './stores'
import { STORE_TODO, STORE_ROUTER, STORE_TALK } from './constants/stores'
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
  new TalkModel('1', '标题1', '描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1' +
  '描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1' +
  '描述1描述1描述1描述1描述1描述 __1描述1描述1描述1描述1描述__ 1描述1描述1描述1 \n\n 描述1描述1描述1描述1 ' +
  '描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1' +
  '描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1' +
  '描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1' +
  '描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1', new UserModel('Bain', 'bgdxiake@qq.com'), '2018-1-10 12:30', 1),
  new TalkModel('2', '标题2', '描述2'),
  new TalkModel('3', '标题3', '描述3'),
  new TalkModel('4', '标题4', '描述4'),
  new TalkModel('5', '标题5', '描述5')
]

// prepare MobX stores
const history = createBrowserHistory()
const todoStore = new TodoStore(defaultTodos)
const routerStore = new RouterStore(history)
const talkStore = new TalkStore(defaultTalks)
const rootStores = {
  [STORE_TODO]: todoStore,
  [STORE_ROUTER]: routerStore,
  [STORE_TALK]: talkStore
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
