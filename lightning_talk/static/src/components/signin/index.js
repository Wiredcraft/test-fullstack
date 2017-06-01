import { createElement as el, Component } from 'react'
import { connect } from 'react-redux'

import { signin } from 'actions/user'
import styles from 'index.css'

class component extends Component {
  render () {
    const { form, changeUsername, changePassword, changeEmail } = this.props

    return el('div', { className: styles['container'] },
      el('div', { className: styles['form'] },
        el('input', { className: styles['username'], value: form.username, placeholder: 'Username', onChange: changeUsername }),
        el('input', { className: styles['password'], type: 'password', value: form.password, placeholder: 'Password', onChange: changePassword }),
      ),
      el('div', { className: styles['button'], onClick: this.props.signin }, 'Sign in'),
    )
  }
}

const mapStateToProps = (state) => {
  return {
    form: { ...state.signin }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signin: () => dispatch(signin()),
    changeUsername: (e) => dispatch({ type: 'SIGNIN_FORM_CHANGE_USERNAME', username: e.target.value }),
    changePassword: (e) => dispatch({ type: 'SIGNIN_FORM_CHANGE_PASSWORD', password: e.target.value }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
