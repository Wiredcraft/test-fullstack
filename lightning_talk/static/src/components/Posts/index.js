import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchPosts } from 'actions/post'
import Post from 'Post'
import styles from 'index.css'

class Component extends React.Component {
  componentDidMount() {
    this.props.load()
  }

  render() {
    const { posts: { results, next, previous, current }, user: { token }, load } = this.props

    return (
      <div className={styles['container']}>
        <div className={styles['list']}>
          {results.map(data => <Post key={data.url} data={data} />)}
          {current && results.length === 0 ? <div className={styles['empty']}>Nothing yet.</div> : null}
          {token && current && results.length === 0
            ? <Link className={styles['be-the-first']} to={{ pathname: '/new', state: { modal: true } }}>
                Create One!
              </Link>
            : null}
        </div>
        <div className={styles['page']}>
          {previous ? <div className={styles['prev']} onClick={() => load(previous)}>prev</div> : null}
          {next ? <div className={styles['next']} onClick={() => load(next)}>next</div> : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ posts, user }) => ({ posts, user })

const mapDispatchToProps = dispatch => {
  return {
    load: url => dispatch(fetchPosts(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
