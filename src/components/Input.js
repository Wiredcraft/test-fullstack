import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './Input.css'

class Input extends Component {
  render() {
    const {className, tag, violation, ...rest} = this.props

    const props = {
      ...rest,
      className: 'Input',
    }

    return (
      <div className={cx('Input-wrapper', className)}>
        {React.createElement(tag, props)}
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
  tag: PropTypes.oneOf(['input', 'textarea']),
  className: PropTypes.string,
  violation: PropTypes.string,
}

Input.defaultProps = {
  tag: 'input',
}

export default Input
