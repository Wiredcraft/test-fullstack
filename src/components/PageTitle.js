import React from 'react'

export default function PageTitle({ title }) {
  return (
    <div className="page-title-container">
      <div>
        <p className="page-title">{title}</p>
      </div>
    </div>
  )
}
