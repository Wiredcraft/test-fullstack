import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import moment from 'moment'
import './Calendar.css'

const dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

class Calendar extends Component {
  state = {
    month: (this.props.selected ? moment(this.props.selected) : moment()).startOf('month')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected) {
      this.setState({
        month: moment(nextProps.selected).startOf('month')
      })
    }
  }

  previous = () => {
    let month = this.state.month
    month.add(-1, 'M')
    this.setState({
      month: month
    })
  }

  next = () => {
    let month = this.state.month
    month.add(1, 'M')
    this.setState({
      month: month
    })
  }

  renderWeek(date) {
    let days = []

    const day = date.clone()
    for (let i = 0; i < 7; i++) {
      const currentDay = day.clone()
      const ts = currentDay.unix() * 1000
      const min = this.props.min || 0
      const max = this.props.max || moment().add(50, 'year').unix() * 1000

      if (ts >= min && ts <= max) {
        days.push(
          <span
            key={day.toString()}
            className={cx('Calendar-day', { 'Calendar-day-selected': ts === this.props.selected })}
            onClick={() => this.props.onSelectDate(currentDay)}>
            {day.date()}
          </span>
        )
      } else {
        days.push(
          <span
            key={day.toString()}
            className="Calendar-day Calendar-day-disabled">
            {day.date()}
          </span>
        )
      }

      day.add(1, 'd')
    }

    return (
      <div
        key={date.toString()}
        className="Calendar-week">
        {days}
      </div>
    )
  }

  render() {
    const { onClickCalendar } = this.props
    const { month } = this.state

    let weeks = []
    let done = false
    let date = month.clone().startOf('month').day('Sunday')
    let monthIndex = date.month()
    let count = 0

    while (!done) {
      weeks.push(this.renderWeek(date))
      date.add(1, 'week')
      done = count > 2 && monthIndex !== date.month()
      count = count + 1
      monthIndex = date.month()
    }

    return (
      <div
        className="Calendar"
        onClick={onClickCalendar}>
        <div className="Calendar-header">
          <span
            className="Calendar-prev"
            onClick={this.previous}>
            prev
          </span>
          <span className="Calendar-month">
            {month.format('YYYY-MM')}
          </span>
          <span
            className="Calendar-next"
            onClick={this.next}>
            next
          </span>
        </div>
        <div className="Calendar-week Calendar-week-header">
          {dayNames.map(day =>
            <span
              key={day}
              className="Calendar-day">
              {day}
            </span>
          )}
        </div>
        {weeks}
      </div>
    )
  }
}

Calendar.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  selected: PropTypes.number,
  onSelectDate: PropTypes.func,
  onClickCalendar: PropTypes.func,
}

export default Calendar
