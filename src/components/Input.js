import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Datepicker from './Datepicker'
import './Input.css'

const componentMap = {
  Datepicker,
}

class Input extends Component {
  render() {
    const {className, tag, violation, children, ...rest} = this.props

    const props = {
      ...rest,
      className: 'Input',
    }
    const component = componentMap[tag] || tag

    return (
      <div className={cx('Input-wrapper', className)}>
        {React.createElement(component, props, children)}
        {violation &&
          <div className="Input-violation">
            {violation}
          </div>
        }
      </div>
    )
  }
}

Input.propTypes = {
  tag: PropTypes.oneOf(['input', 'textarea', 'select', 'Datepicker']),
  className: PropTypes.string,
  violation: PropTypes.string,
  children: PropTypes.node,
}

Input.defaultProps = {
  tag: 'input',
}

export default Input
