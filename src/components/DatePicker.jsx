import React from 'react'
import PropTypes from 'prop-types'
import Flatpickr from 'flatpickr'
class DatePicker extends React.Component {

  componentDidMount () {
    const { input, id} = this.props
    const config = {
      onChange: (v) => {
        input && input.onChange(v)
      }
    }
    this.flatpickr = new Flatpickr(this.refs[id], config)
  }

  render () {
    const { input: { name }, id, label, meta: { touched, error } } = this.props
    return (
      <div className='field flex'>
        <label>{label}</label>
        <div className='field-with-err'>
          <input ref={id} readOnly className='flatpickr form-control' type='text' placeholder={name} />
          <div className='font-err'>{touched && error ? <div>{error}</div> : null}</div>
        </div>
      </div>
    )
  }
}

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string
}

export default DatePicker
