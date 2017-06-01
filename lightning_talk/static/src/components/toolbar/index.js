import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import styles from 'index.css'

class Component extends React.Component {
  render() {
    const { username } = this.props

    return (
      <div className={styles['container']}>
        {username
          ? <div className={styles['account']}>{username}</div>
          : <Link className={styles['signin']} to={{ pathname: '/signin', state: { modal: true } }}>
              sign in
            </Link>}
      </div>
    )
  }
}

const mapStateToProps = ({ user: { username } }) => ({ username })

export default connect(mapStateToProps)(Component)
