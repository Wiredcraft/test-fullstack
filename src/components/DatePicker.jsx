import React from 'react'
import PropTypes from 'prop-types'
import Flatpickr from 'flatpickr'
class DatePicker extends React.Component {
  constructor (props) {
    super()
  }

  componentDidMount () {
    const { input, disable, onChange, enable, enableTime, mode, id} = this.props
    const config = {
      onChange: (v) => {
        input ? input.onChange(v) : onChange(v)
      }
    }
    this.flatpickr = new Flatpickr(this.refs[id], config)
  }

  render () {
    const { input: {name}, id, placeholder, label, meta: { touched, error, warning } } = this.props
    return (
      <div className='field flex'>
        <label>{label}</label>
        <div className='field-with-err'>
          <input ref={id} readOnly className='flatpickr form-control' type='text' placeholder={placeholder} />
          <div className='font-red'>{touched && error ? <div>{error}</div> : null}</div>
        </div>
      </div>
    )
  }
}

DatePicker.propTypes = {
  id: PropTypes.string
}

export default DatePicker
