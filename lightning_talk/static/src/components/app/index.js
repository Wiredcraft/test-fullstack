import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ROOT } from 'config'
import styles from 'index.css'
import Toolbar from 'components/Toolbar'
import Toast from 'components/Toast'
import Posts from 'components/Posts'
import Signin from 'components/Signin'

class ModalSwitch extends React.Component {
  previousLocation = this.props.location

  componentWillUpdate(nextProps) {
    const { location } = this.props

    if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
      this.previousLocation = this.props.location
    }
  }

  render() {
    const { location } = this.props
    const isModal = !!(location.state && location.state.modal && this.previousLocation !== location)

    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path={ROOT} component={Posts} />
        </Switch>
        {isModal ? <Route path="/signin" component={Signin} /> : null}
      </div>
    )
  }
}

class Component extends React.Component {
  render() {
    return (
      <Router>
        <div className={styles['container']}>
          <Toolbar />
          <Route component={ModalSwitch} />
          <Toast />
        </div>
      </Router>
    )
  }
}

export default Component
