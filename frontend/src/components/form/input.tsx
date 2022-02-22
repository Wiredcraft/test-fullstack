import { ChangeEvent, useEffect, useState } from 'react'
import './index.css'

interface InputProps {
  label: string
  type?: 'input' | 'password' | 'textarea'
  onChange: (value: string) => void
}

export default function({
  label,
  type = 'input',
  onChange
}: InputProps) {

  const [value, setValue] = useState('')
  
  useEffect(() => {
    onChange(value)
  }, [value])

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  return (
    <div className='form-item'>
      <label>{label}:</label>
      <input type={type} value={value} onChange={changeHandle}  />
    </div>
  )
}