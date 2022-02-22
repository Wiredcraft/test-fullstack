import React from 'react'
import Header from '@/components/header'
import './index.css'

interface LayoutProps {
  children: React.ReactChild
}

export default function(
  { 
    children 
  }: LayoutProps
) {
  return (
    <div className='layout-wrapper'>
      <Header />
      {children}
    </div>
  )
}