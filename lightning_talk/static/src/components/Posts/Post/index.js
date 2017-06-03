import React from 'react'
import { connect } from 'react-redux'

import UpArrow from 'components/icons/UpArrow'
import styles from 'index.css'
import { upvotePost } from 'actions/post'

class Component extends React.Component {
  componentWillUnmount() {
    const { highlight, resetHighlightUrl } = this.props

    if (highlight) {
      resetHighlightUrl()
    }
  }

  render() {
    const { highlight, data: { title, description, user, upvotes } } = this.props

    return (
      <div className={`${styles['container']} ${highlight ? styles['highlight'] : ''}`}>
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
            <div className={styles['username']}>{user === null ? 'deleted' : user.username}</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ highlightPost: { url } }, ownProps) => ({
  highlight: url === ownProps.data.url
})

const mapDispatchToProps = (dispatch, { data: { url } }) => ({
  resetHighlightUrl: () => dispatch({ type: 'HIGHLIGHT_POST_RESET_URL' }),
  upvotePost: () => dispatch(upvotePost(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
