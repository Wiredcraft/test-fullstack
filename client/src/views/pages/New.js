import React from 'react'
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import { Form, FormGroup } from '../../scss/form'

class New extends React.Component {
  renderTextField = ({ input, label, meta: { touched, error, warning }, ...choices }) => (
    <FormGroup className='form-input'>
      <label>
        {label}
      </label>
      <input {...input} value={(typeof input.value === 'string') ? input.value : ''} />
      <div>
        { 
          !!touched && !!error && <span>{ error }</span>
        }
      </div>
      
    </FormGroup>
  );

	render() {
		const { invalid, pristine, submitting, handleSubmit } = this.props
		return (
			<div>
				<h1>New Topics</h1>
				<Form 
          id='new-poll-form'
					onSubmit={handleSubmit}>
          <Field
            ref='title'
            id='title'
            type='text'
            name='title'
            label='Title'
            placeholder='Spit out your idea'
            component={this.renderTextField}
          />

          <button type="submit" disabled={submitting}>
            Post
          </button>
				</Form>
			</div>
		)
	}
}

New.propTypes = {
  postPoll: PropTypes.func.isRequired
}

New = reduxForm({
  form: 'newPoll',
  fields: ['title'],
  touchOnChange: true,
  validate: (values, props) => {
    const errors = {};
    const title = values.title;
    if (!title || (!!title && (typeof title !== 'string' || title.trim() === ''))) {
      errors.title = '* Required';
    }

    return errors;
  },
  onSubmit: (values, dispatch, props) => new Promise((resolve, reject) => props.postPoll({ ...values }, { resolve, reject })),
  onSubmitSuccess: (result, dispatch, props) => result

})(New);

export default New