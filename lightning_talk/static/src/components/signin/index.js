import React from 'react'
import { connect } from 'react-redux'

import { signin } from 'actions/user'
import styles from 'index.css'

class Component extends React.Component {
  close(e) {
    if (e.target === this.layout) {
      this.props.history.goBack()
      this.props.reset()
    }
  }

  render() {
    const { form, changeUsername, changePassword, changeEmail, submit } = this.props

    return (
      <div
        className={styles['layout']}
        onClick={::this.close}
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
  return {
    reset: () => dispatch({ type: 'SIGNIN_FORM_RESET' }),
    submit: () => dispatch(signin(() => ownProps.history.goBack())),
    changeUsername: e => dispatch({ type: 'SIGNIN_FORM_CHANGE_USERNAME', username: e.target.value }),
    changePassword: e => dispatch({ type: 'SIGNIN_FORM_CHANGE_PASSWORD', password: e.target.value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
