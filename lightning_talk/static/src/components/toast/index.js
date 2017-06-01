import { createElement as el, Component } from 'react'
import { connect } from 'react-redux'

import styles from 'index.css'

class component extends Component {
  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  componentWillReceiveProps ({ message }) {
    if (message !== '') {
      this.wait()
    }
  }

  wait () {
    this.timeout = setTimeout(() => {
      this.props.close()
    }, 1200)
  }

  render () {
    const { message, type } = this.props

    if (message === '') {
      return null
    }

    return el('div', { className: `${styles['container']} ${styles[type]}` }, message)
  }
}

const mapStateToProps = ({ toast: { message, type } }) => ({ message, type })

const mapDispatchToProps = dispatch => {
  return {
    close: () => dispatch({ type: 'RESET_TOAST' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
