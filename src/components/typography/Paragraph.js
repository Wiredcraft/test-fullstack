import PropTypes from 'prop-types'
import React from 'react'

function Paragraph({ text }) {
  return <p className="paragraph">{text}</p>
}

Paragraph.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Paragraph
