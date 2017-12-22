import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { submitNewTalk } from '../actions/'
import { canNotBeEmpty } from '../helper'
import FieldWithErr from '../components/FieldWithErr'
import DatePicker from '../components/DatePicker'

class NewLightingTalkForm extends Component {

  handleSubmit (values) {
    const { LightingTalks } = this.props
    return new Promise((resolve, reject) => {
      const exist = LightingTalks.some((i) => {
        return i.title === values.title
      })
      if (exist) {
        reject(new SubmissionError({title: 'This title already exists'}))
      } else {
        this.props.submitNewTalk({...values})
        this.props.history.push('/')
        resolve()
      }
    })
  }

  render() {
    const { data, voteHandler } = this.props
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
        <Field name='title' label='Title' component={FieldWithErr} fieldType='input' type='text' />
        <Field name='author' label='Author' component={FieldWithErr} fieldType='input' type='text' />
        <Field name='publishDate' label='Publish Date' id='publishDate' component={DatePicker} />
        <Field name='description' label='Description' component={FieldWithErr} fieldType='textarea' type='text' />
        <Field name='public' label='Public' component={FieldWithErr} fieldType='checkbox' type='text' />
        <div className='submit-btn flex'>
          <button type='submit'>Submit</button>
          <button className='cancel'><Link to='/'>cancel</Link></button>
        </div>
      </form>
    )
  }
}


const mapStateToProps = state => ({
  LightingTalks: state.LightingTalks,
})

const mapDispatchToProps = dispatch => ({
  submitNewTalk: data => dispatch(submitNewTalk(data)),
})

const validate = (values) => {
  let errors = canNotBeEmpty(values, ['title', 'author', 'description', 'publishDate'])
  if (values.title && values.title.length > 60) {
    errors.title = 'title to long'
  }
  if (values.author && values.author.length > 20) {
    errors.author = 'author to long'
  }
  if (values.description && values.description.length > 600) {
    errors.description = 'description to long'
  }
  return errors
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'NewLightingTalkForm',
  validate
})(NewLightingTalkForm))
