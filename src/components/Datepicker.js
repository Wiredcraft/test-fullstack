import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Calendar from './Calendar'
import moment from 'moment'
import cx from 'classnames'
import './Datepicker.css'

const ts2date = ts => moment(ts).format('YYYY-MM-DD')

class Datepicker extends Component {
  state = {
    open: false
  }

  componentWillUnmount() {
    this.removeGlobalListener()
  }

  addGlobalListener() {
    if (this.isGlobalListenerAdded) return
    this.isGlobalListenerAdded = true
    document.addEventListener('click', this.toggle)
  }

  removeGlobalListener() {
    if (!this.isGlobalListenerAdded) return
    this.isGlobalListenerAdded = false
    document.removeEventListener('click', this.toggle)
  }

  onClickCalendar(e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  toggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  onSelectDate = day => {
    this.props.onChange(day.unix() * 1000)
    this.toggle()
  }

  render() {
    const {id, className, style, value, defaultValue, min, max} = this.props
    const {open} = this.state

    this[open ? 'addGlobalListener' : 'removeGlobalListener']()

    return (
      <div
        id={id}
        style={style}
        className={cx('Datepicker', className)}>
        <div
          className="Datepicker-input"
          onClick={this.toggle}>
          {value ?
            ts2date(value)
            :
            defaultValue ? ts2date(defaultValue) : (<span className="Datepicker-placeholder">choose date</span>)
          }
        </div>
        {open &&
          <Calendar
            min={min}
            max={max}
            selected={value || defaultValue}
            onSelectDate={this.onSelectDate}
            onClickCalendar={this.onClickCalendar}
          />
        }
      </div>
    )
  }
}

Datepicker.propTypes = {
  style: PropTypes.object,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
}

export default Datepicker
