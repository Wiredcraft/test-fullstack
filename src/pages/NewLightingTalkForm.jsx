import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createBrowserHistory } from 'react-router-dom'
import { submitNewTalk } from '../actions/'

class NewLightingTalkForm extends Component {

  handleSubmit (e) {
    e.preventDefault()
    const title = this.refs.title.value
    const username = this.refs.username.value
    const description = this.refs.description.value
    this.props.submitNewTalk({title, username, description})
    alert('success')
    this.props.history.push('/list')
  }

  render() {
    const { data, voteHandler } = this.props
    return (
      <form >
        <div className='field flex'>
          <label>title</label>
          <input type="text" ref='title'/>
        </div>
        <div className='field flex'>
          <label>username</label>
          <input type="text" ref='username'/>
        </div>
        <div className='field flex'>
          <label>description</label>
          <textarea ref='description'/>
        </div>
        <div className='submit-btn flex'>
          <button onClick={this.handleSubmit.bind(this)}>Submit</button>
          <button className='cancel'><Link to='/list'>cancel</Link></button>
        </div>
      </form>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  submitNewTalk: data => dispatch(submitNewTalk(data)),
})

export default connect(
  null,
  mapDispatchToProps
)(NewLightingTalkForm)
