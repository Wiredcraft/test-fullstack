import React from 'react'
import { connect } from 'react-redux'

import { signin } from 'actions/user'
import styles from 'index.css'

class Component extends React.Component {
  render() {
    const { form, changeUsername, changePassword, close, changeEmail, submit } = this.props

    return (
      <div
        className={styles['layout']}
        onClick={e => e.target === this.layout && close()}
        ref={l => {
          this.layout = l
        }}
      >
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
          <div className={styles['button']} onClick={submit}>Sign in</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    form: { ...state.signin }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const close = () => {
    ownProps.history.goBack()
    dispatch({ type: 'SIGNIN_FORM_RESET' })
  }

  return {
    close,
    submit: () => dispatch(signin(close)),
    changeUsername: e => dispatch({ type: 'SIGNIN_FORM_CHANGE_USERNAME', username: e.target.value }),
    changePassword: e => dispatch({ type: 'SIGNIN_FORM_CHANGE_PASSWORD', password: e.target.value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
