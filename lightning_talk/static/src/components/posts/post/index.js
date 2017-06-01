import { createElement as el, Component } from 'react'
import { connect } from 'react-redux'

import upArrow from 'components/icons/upArrow'
import styles from 'index.css'
import { upvotePost } from 'actions/post'

class component extends Component {
  render () {
    const { title, description, user, upvotes } = this.props.data

    return el('div', { className: styles['container'] },
      el('div', { className: styles['left'], onClick: this.props.upvotePost },
        el('div', { className: styles['icon'] }, el(upArrow)),
        el('div', { className: styles['count'] }, upvotes.length),
      ),
      el('div', { className: styles['right'] },
        el('div', { className: styles['title'] }, title),
        el('div', { className: styles['description'] }, description),
        el('div', { className: styles['right--bottom'] },
          el('div', { className: styles['post-by'] }, 'post by'),
          el('div', { className: styles['username'] }, user.username),
        ),
      ),
    )
  }
}

const mapDispatchToProps = (dispatch, { data: { url } }) => {
  return {
    upvotePost: () => dispatch(upvotePost(url))
  }
}

export default connect(null, mapDispatchToProps)(component)
