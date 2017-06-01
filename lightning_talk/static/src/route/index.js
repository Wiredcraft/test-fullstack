import { createElement as el, Component } from 'react'
import { connect } from 'react-redux'

import func from 'func'
import app from 'components/app'
import posts from 'components/posts'

const routes = [
  // func.route('path', () => el(component))
  func.route('/lightning_talk', () => el(posts))
]

const titles = {
  // 'path': 'title'
}

class component extends Component {
  componentWillReceiveProps ({ route }) {
    if (route.href !== this.props.route.href) {
      const matched = func.match(route.href, routes)
      if (matched) {
        window.document.title = titles[matched.path] || ''
      }
    }
  }

  render () {
    const matched = func.match(this.props.route.href, routes)
    if (matched) {
      const { params, path } = matched
      return el(app, undefined, matched.handler({ params, path }))
    }
    return el('div', null, '¯\\_(ツ)_/¯')
  }
}

export default connect(({ route }) => ({ route }))(component)
