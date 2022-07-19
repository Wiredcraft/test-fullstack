import React from 'react'
import { Loader } from 'components'

export default function PrimaryButton({ text, onClick, isLoading }) {
  return (
    <button type="button" className="primary-button" onClick={onClick}>
      {isLoading ? <Loader /> : text}
    </button>
  )
}
