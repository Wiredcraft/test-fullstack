import { ChangeEvent, useEffect, useState } from 'react'
import './index.css'

interface BtnProps {
  btnText?: string
  onClick: () => void
}

export default function({
  btnText = 'Submit',
  onClick
}: BtnProps) {

  return (
    <div className='form-item'>
      <label></label>
      <button type='button' onClick={onClick}>{btnText}</button>
    </div>
  )
}