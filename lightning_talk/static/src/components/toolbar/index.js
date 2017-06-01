import React from 'react'
import { connect } from 'react-redux'

import styles from 'index.css'

class Component extends React.Component {
  render() {
    const { username, signin } = this.props

    return (
      <div className={styles['container']}>
        {username
          ? <div className={styles['account']}>{username}</div>
          : <div className={styles['signin']} onClick={signin}>sign in</div>}
      </div>
    )
  }
}

const mapStateToProps = ({ user: { username } }) => ({ username })

const mapDispatchToProps = dispatch => {
  return {
    signin: () => dispatch({ type: 'OPEN_SIGNIN_MODAL' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
