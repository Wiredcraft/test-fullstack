import { createElement as el, Component } from 'react'

class component extends Component {
  render () {
    return el('svg', { viewBox: '0 0 11 7', width: '11' },
      el('path', { d: 'm.202 5.715c-.367.417-.217.755.329.755h9.438c.549 0 .702-.33.338-.742l-4.41-4.985c-.363-.41-.947-.412-1.322.013l-4.373 4.96' })
    )
  }
}

export default component
