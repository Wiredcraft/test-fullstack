import React, { Component } from 'react'
import Form from './Form'
import { addTalk } from '../actions/actionCreators'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => ({
    talksToUpdate: state && state.talks.talks
})

const mapDispatchToProps = (dispatch) => ({
    addTalk: (allTalks, talk) => dispatch(addTalk(allTalks, talk))
})

class FormContainer extends Component {
  state = {
    errors: [],
    newTalk: {
      title: '',
      desc: '',
      user: '',
      public: ''
    }
  }

  handleSubmitClick = () => {
    if(this.isFormValid()) {
      this.handleAddTalk()
      this.props.history.push('/')
    }
  }

  isFormValid = () => {
    const fieldsToValidate = ['title', 'desc', 'user', 'publish', 'public']
    this.displayError(fieldsToValidate)
    return (
      this.state.newTalk.title &&
      this.state.newTalk.desc &&
      this.state.newTalk.user &&
      this.state.newTalk.publish &&
      this.state.newTalk.public
    )
  }

  handleBlur = (field) => {
    this.displayError([field])
    this.setState({focused: ''})
  }

  displayError = (fields) => {
    let errors = [...this.state.errors]
    fields.map(field => {
      if(!this.state.newTalk[field]) {
        errors = errors.filter(e => e ===field).length > 0 ?
        [...errors] :
        [...errors, field]
      }
      return true
    })
    this.setState({errors})
  }

  handleAddTalk = () => {
    this.props.addTalk(this.props.talksToUpdate, this.state.newTalk)
  }

  handleInputChange = (field, e) => {
    const newTalk = {...this.state.newTalk, [field]: e.target.value}
    this.removeFromErrors(field)
    this.setState({newTalk})
  }

  handleDateChange = (date) => {
    const newTalk = {...this.state.newTalk, publish: date}
    this.removeFromErrors('publish')
    this.setState({newTalk})
  }

  removeFromErrors = (field) => {
    const indexInErrors = this.state.errors.indexOf(field)
    if(indexInErrors > -1) {
      let errors = [...this.state.errors]
      errors.splice(indexInErrors, 1)
      this.setState({errors})
    }
  }

  handleInputFocus = (field) => {
    this.setState({focused: field})
  }
    
  render() {
    return (
      <Form
        onChange={this.handleInputChange}
        onDateChange={this.handleDateChange}
        onSubmit={this.handleSubmitClick}
        onBlur={this.handleBlur}
        onFocus={this.handleInputFocus}
        focused={this.state.focused}
        values={this.state.newTalk}
        errors={this.state.errors}
      />
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormContainer));
