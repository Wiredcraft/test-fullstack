import { createElement as el, Component } from 'react'
import { connect } from 'react-redux'

import styles from 'index.css'

class component extends Component {
  render () {
    const { username, signin } = this.props

    return el('div', { className: styles['container'] },
      username
        ? el('div', { className: styles['account'] }, username)
        : el('div', { className: styles['signin'], onClick: signin }, 'sign in')
    )
  }
}

const mapStateToProps = ({ user: { username } }) => ({ username })

const mapDispatchToProps = dispatch => {
  return {
    signin: () => dispatch({ type: 'OPEN_SIGNIN_MODAL' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
