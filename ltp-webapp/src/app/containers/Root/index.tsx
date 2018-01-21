import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { STORE_TALK, STORE_ROUTER, STORE_USER } from '../../constants/stores'
import { RouterStore, UserStore } from '../../stores'

@inject(STORE_ROUTER, STORE_USER)
@observer
export class Root extends React.Component<any, any> {

  routerStore: RouterStore
  userStore: UserStore
  constructor (props, context) {
    super(props, context)
    // this.routerStore = this.props[STORE_ROUTER] as RouterStore
    // this.userStore = this.props[STORE_USER] as UserStore
    // if (!this.userStore.currentUser && !['/login', '/register'].includes(this.routerStore.location.pathname)) {
    //   this.routerStore.push('/login')
    // }
  }

  renderDevTool () {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default
      return (<DevTools />)
    }
  }

  render () {
    return (
      <div className='container'>
        {this.props.children}
        {this.renderDevTool()}
      </div>
    )
  }
}
