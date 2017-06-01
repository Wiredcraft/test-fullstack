import React from 'react'
import { connect } from 'react-redux'

import Signin from 'components/Signin'
import styles from 'index.css'

class Component extends React.Component {
  close(e) {
    if (e.target !== this.container) {
      return
    }

    const { isSigninModalOpen, closeSigninModal } = this.props

    if (isSigninModalOpen) {
      closeSigninModal()
    }
  }

  render() {
    const { leastOneOpen, isSigninModalOpen, closeSigninModal } = this.props

    return (
      <div
        className={leastOneOpen ? styles['container'] : styles['hide']}
        ref={c => {
          this.container = c
        }}
        onClick={::this.close}
      >
        {isSigninModalOpen ? <Signin /> : null}
      </div>
    )
  }
}

const mapStateToProps = ({ modal }) => {
  return {
    ...modal,
    leastOneOpen: Object.values(modal).reduce((acc, val) => acc || val)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeSigninModal: () => dispatch({ type: 'CLOSE_SIGNIN_MODAL' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
