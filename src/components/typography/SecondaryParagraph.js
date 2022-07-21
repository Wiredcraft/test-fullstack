import PropTypes from 'prop-types'
import React from 'react'

function SecondaryParagraph({ text }) {
  return <p className="secondary-paragraph">{text}</p>
}

SecondaryParagraph.propTypes = {
  text: PropTypes.string.isRequired,
}

export default SecondaryParagraph
