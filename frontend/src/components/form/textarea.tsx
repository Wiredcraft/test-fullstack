import { ChangeEvent, useEffect, useState } from 'react'
import './index.css'

interface TextareaProps {
  label: string
  rows?: number
  onChange: (value: string) => void
}

export default function({
  label,
  rows = 4,
  onChange
}: TextareaProps) {

  const [value, setValue] = useState('')
  
  useEffect(() => {
    onChange(value)
  }, [value])

  const changeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  return (
    <div className='form-item'>
      <label>{label}:</label>
      <textarea value={value} rows={rows} onChange={changeHandle} />
    </div>
  )
}