import React, { Component } from 'react'
import Form from './Form'
import { addTalk } from '../actions/actionCreators'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => ({
    talksToUpdate: state && state.talks
})

const mapDispatchToProps = (dispatch) => ({
    addTalk: (allTalks, talk) => dispatch(addTalk(allTalks, talk))
})

class FormContainer extends Component {
  state = {
    isSubmitClicked: false,
    newTalk: {
      title: '',
      desc: '',
      user: ''
    }
  }

  handleSubmitClick = () => {
    this.setState({isSubmitClicked: true})
    if(this.isFormValid()) {
      this.handleAddTalk()
      this.props.history.push('/')
    } else {
      this.setState({error: true})
    }
  }

  isFormValid = () => {
    return this.state.newTalk.title && this.state.newTalk.desc && this.state.newTalk.user
  }

  handleAddTalk = () => {
    this.props.addTalk(this.props.talksToUpdate, this.state.newTalk)
  }

  handleInputChange = (field, e) => {
    const newTalk = {...this.state.newTalk, [field]: e.target.value}
    this.setState({newTalk})
  }
    
  render() {
    return (
      <Form
        onChange={this.handleInputChange}
        onSubmit={this.handleSubmitClick}
        values={this.state.newTalk}
        error={this.state.error}
      />
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormContainer));
