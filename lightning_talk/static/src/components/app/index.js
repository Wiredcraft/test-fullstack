import React from 'react'

import Toolbar from 'components/toolbar'
import Modal from 'components/modal'
import Toast from 'components/toast'
import styles from 'index.css'

class App extends React.Component {
  render() {
    return (
      <div className={styles['container']}>
        <Toolbar />
        {this.props.children}
        <Modal />
        <Toast />
      </div>
    )
  }
}

export default App
