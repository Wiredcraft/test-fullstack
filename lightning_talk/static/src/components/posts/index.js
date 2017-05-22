import { createElement as el, Component } from 'react'
import { connect } from 'react-redux'

import styles from 'index.css'

class component extends Component {
  render () {
    return el('div', { className: styles['container'] }

    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
