import { createElement as el, Component } from 'react'
import { connect } from 'react-redux'

import { fetchPosts } from 'actions/post'
import post from 'post'
import styles from 'index.css'

class component extends Component {
  componentDidMount () {
    this.props.load()
  }

  render () {
    return el('div', { className: styles['container'] },
      this.props.posts.all.map((data, index) => el(post, { key: index, data }))
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts })

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
