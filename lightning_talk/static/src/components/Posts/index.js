import React from 'react'
import { connect } from 'react-redux'

import { fetchPosts } from 'actions/post'
import Post from 'Post'
import styles from 'index.css'

class Component extends React.Component {
  componentDidMount() {
    this.props.load()
  }

  render() {
    return (
      <div className={styles['container']}>
        {this.props.posts.all.map(data => <Post key={data.url} data={data} />)}
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts })

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
