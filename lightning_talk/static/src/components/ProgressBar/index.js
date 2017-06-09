import React from 'react'
import { connect } from 'react-redux'

import styles from 'index.css'

class Component extends React.Component {
  timeout = null

  componentWillReceiveProps({ loading }) {
    if (loading) {
      this.timeout = setTimeout(() => {
        this.props.done()
      }, 800)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    return (
      <div className={styles['container']}>
        {this.props.loading ? <div className={styles['bar']} /> : null}
      </div>
    )
  }
}

const mapStateToProps = ({ progressBar: { loading } }) => ({ loading })

const mapDispatchToProps = dispatch => ({
  done: () => dispatch({ type: 'LOADED' })
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
