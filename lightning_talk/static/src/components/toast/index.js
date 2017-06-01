import React from 'react'
import { connect } from 'react-redux'

import styles from 'index.css'

class Component extends React.Component {
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  componentWillReceiveProps({ message }) {
    if (message !== '') {
      this.wait()
    }
  }

  wait() {
    this.timeout = setTimeout(() => {
      this.props.close()
    }, 1200)
  }

  render() {
    const { message, type } = this.props

    if (message === '') {
      return null
    }

    return (
      <div className={`${styles['container']} ${styles['type']}`}>
        {message}
      </div>
    )
  }
}

const mapStateToProps = ({ toast: { message, type } }) => ({ message, type })

const mapDispatchToProps = dispatch => {
  return {
    close: () => dispatch({ type: 'RESET_TOAST' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
