import PropTypes from 'prop-types'
import React from 'react'

function PageTitle({ title }) {
  return (
    <div className="page-title-container">
      <div>
        <p className="page-title">{title}</p>
      </div>
    </div>
  )
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PageTitle
