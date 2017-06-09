import React from 'react'
import { connect } from 'react-redux'

import { createPost } from 'actions/post'
import styles from 'index.css'

class Component extends React.Component {
  render() {
    const { title, description, changeTitle, changeDescription, submit, close } = this.props
    return (
      <div
        className={styles['layout']}
        onClick={e => e.target === this.layout && close()}
        ref={l => {
          this.layout = l
        }}
      >
        <div className={styles['container']}>
          <input className={styles['title']} placeholder="title" value={title} onChange={changeTitle} />
          <textarea
            className={styles['description']}
            placeholder="description"
            value={description}
            onChange={changeDescription}
          />
          <div className={styles['button']} onClick={submit}>Submit</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ createPost: { title, description } }) => ({ title, description })

const mapDispatchToProps = (dispatch, ownProps) => {
  const close = () => {
    ownProps.history.goBack()
    dispatch({ type: 'CREATE_POST_FORM_RESET' })
  }

  return {
    close,
    submit: () => dispatch(createPost(close)),
    changeTitle: e => dispatch({ type: 'CREATE_POST_FORM_CHANGE_TITLE', title: e.target.value }),
    changeDescription: e => dispatch({ type: 'CREATE_POST_FORM_CHANGE_DESCRIPTION', description: e.target.value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
