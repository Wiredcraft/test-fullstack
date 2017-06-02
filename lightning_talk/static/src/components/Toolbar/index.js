import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import styles from 'index.css'

class Component extends React.Component {
  render() {
    const { username, signout } = this.props

    return (
      <div className={styles['container']}>
        {username !== '' ? <div className={styles['account']}>{username}</div> : null}
        {username === ''
          ? <Link className={styles['signin']} to={{ pathname: '/signin', state: { modal: true } }}>
              sign in
            </Link>
          : null}
        {username !== '' ? <div className={styles['signout']} onClick={signout}>sign out</div> : null}
      </div>
    )
  }
}

const mapStateToProps = ({ user: { username } }) => ({ username })

const mapDispatchToProps = dispatch => {
  return {
    signout: () => dispatch({ type: 'RESET_USER' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
