import React from 'react'
import { connect } from 'react-redux'

import UpArrow from 'components/icons/UpArrow'
import styles from 'index.css'
import { upvotePost } from 'actions/post'

class Component extends React.Component {
  render() {
    const { title, description, user, upvotes } = this.props.data

    return (
      <div className={styles['container']}>
        <div className={styles['left']} onClick={this.props.upvotePost}>
          <div className={styles['icon']}>
            <UpArrow />
            <div className={styles['count']}>{upvotes.length}</div>
          </div>
        </div>
        <div className={styles['right']}>
          <div className={styles['title']}>{title}</div>
          <div className={styles['description']}>{description}</div>
          <div className={styles['right--bottom']}>
            <div className={styles['post-by']}>post by</div>
            <div className={styles['username']}>{user.username}</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, { data: { url } }) => {
  return {
    upvotePost: () => dispatch(upvotePost(url))
  }
}

export default connect(null, mapDispatchToProps)(Component)
