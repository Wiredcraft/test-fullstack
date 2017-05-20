import { createElement as el, Component } from 'react'

import styles from 'index.css'

class component extends Component {
  render () {
    return el('div', { className: styles['container'] },
      this.props.children
    )
  }
}

export default component
