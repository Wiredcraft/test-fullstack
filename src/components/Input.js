import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './Input.css'

class Input extends Component {
  render() {
    const {className, tag, violation, children, ...rest} = this.props

    const props = {
      ...rest,
      className: 'Input',
    }

    return (
      <div className={cx('Input-wrapper', className)}>
        {React.createElement(tag, props, children)}
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
  tag: PropTypes.oneOf(['input', 'textarea', 'select']),
  className: PropTypes.string,
  violation: PropTypes.string,
  children: PropTypes.node,
}

Input.defaultProps = {
  tag: 'input',
}

export default Input
