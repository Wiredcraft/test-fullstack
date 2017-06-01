import { createElement as el, Component } from 'react'

import toolbar from 'components/toolbar'
import modal from 'components/modal'
import toast from 'components/toast'
import styles from 'index.css'

class component extends Component {
  render () {
    return el('div', { className: styles['container'] },
      el(toolbar),
      this.props.children,
      el(modal),
      el(toast),
    )
  }
}

export default component
