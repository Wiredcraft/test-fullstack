import { createElement as el, Component } from 'react'

import styles from 'index.css'

class component extends Component {
  render () {
    return el('div', { className: styles['container'] }
      el('input', { className: styles['title'] }),
      el('input', { className: styles['description'] }),
    )
  }
}

export default component
