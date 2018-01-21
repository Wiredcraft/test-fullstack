import React, { Component } from 'react'
import Form from './Form'
import { 
  addTalk,
  updateInputValue,
  updateErrors,
  updateFocused,
  clearTalk
} from '../actions/actionCreators'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => ({
    talksToUpdate: state && state.talks.talks,
    newTalk: state && state.talks.newTalk,
    errors: state && state.talks.errors,
    focused: state && state.talks.focused
})

const mapDispatchToProps = (dispatch) => ({
    addTalk: (allTalks, talk) => dispatch(addTalk(allTalks, talk)),
    updateInputValue: (newTalk) => dispatch(updateInputValue(newTalk)),
    updateErrors: (errors) => dispatch(updateErrors(errors)),
    updateFocused: (field) => dispatch(updateFocused(field)),
    clearTalk: () => dispatch(clearTalk())
})

class FormContainer extends Component {

  componentWillMount = () => this.props.clearTalk()

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
      this.props.newTalk.title &&
      this.props.newTalk.desc &&
      this.props.newTalk.user &&
      this.props.newTalk.publish &&
      this.props.newTalk.public
    )
  }

  handleBlur = (field) => {
    this.displayError([field])
    this.props.updateFocused(field)
  }

  displayError = (fields) => {
    let errors = [...this.props.errors]
    fields.map(field => {
      if(!this.props.newTalk[field]) {
        errors = errors.filter(e => e ===field).length > 0 ?
        [...errors] :
        [...errors, field]
      }
      return true
    })
    this.props.updateErrors(errors)
  }

  handleAddTalk = () => {
    this.props.addTalk(this.props.talksToUpdate, this.props.newTalk)
  }

  handleInputChange = (field, e) => {
    const newTalk = {...this.props.newTalk, [field]: e.target.value}
    this.removeFromErrors(field)
    this.props.updateInputValue(newTalk)
  }

  handleDateChange = (date) => {
    const newTalk = {...this.props.newTalk, publish: date}
    this.removeFromErrors('publish')
    this.props.updateInputValue(newTalk)
  }

  removeFromErrors = (field) => {
    const indexInErrors = this.props.errors.indexOf(field)
    if(indexInErrors > -1) {
      let errors = [...this.props.errors]
      errors.splice(indexInErrors, 1)
      this.props.updateErrors(errors)
    }
  }

  handleInputFocus = (field) => {
    this.props.updateFocused(field)
  }
    
  render() {
    return (
      <Form
        onChange={this.handleInputChange}
        onDateChange={this.handleDateChange}
        onSubmit={this.handleSubmitClick}
        onBlur={this.handleBlur}
        onFocus={this.handleInputFocus}
        focused={this.props.focused}
        values={this.props.newTalk}
        errors={this.props.errors}
      />
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormContainer));
