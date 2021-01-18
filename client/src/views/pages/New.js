import React from 'react'
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

class New extends React.Component {

	render() {
		const { handleSubmit } = this.props
		return (
			<div>
				<h1>New Topics</h1>
				<form id='new-poll-form'
					onSubmit={handleSubmit}>
					<label htmlFor="create_topic"></label>
					<input type="text" name="create_topic" required />
					<input type="submit" value="confirm" />
				</form>
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
  destroyOnUnmount: true,
  persistentSubmitErrors: true,
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
})(New);
export default New