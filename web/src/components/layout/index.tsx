import React from 'react';
import Header from './header';
import './index.scss';

export default function Layout(props: { children: React.ReactNode; }) {
  return (
    <div className="page">
      <Header />
      {props.children}
    </div>
  )
}