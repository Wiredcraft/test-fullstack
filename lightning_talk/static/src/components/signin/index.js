import React from 'react'
import { connect } from 'react-redux'

import { signin } from 'actions/user'
import styles from 'index.css'

class Component extends React.Component {
  render() {
    const { form, changeUsername, changePassword, changeEmail } = this.props

    return (
      <div className={styles['container']}>
        <div className={styles['form']}>
          <input
            className={styles['username']}
            value={form.username}
            placeholder="Username"
            onChange={changeUsername}
          />
          <input
            className={styles['password']}
            type="password"
            value={form.password}
            placeholder="Password"
            onChange={changePassword}
          />
        </div>
        <div className={styles['button']} onClick={this.props.signin}>Sign in</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    form: { ...state.signin }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signin: () => dispatch(signin()),
    changeUsername: e => dispatch({ type: 'SIGNIN_FORM_CHANGE_USERNAME', username: e.target.value }),
    changePassword: e => dispatch({ type: 'SIGNIN_FORM_CHANGE_PASSWORD', password: e.target.value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
