import React from 'react';
import Header from './header';
import './index.scss';

export default function Layout(props: { children: React.ReactNode; }) {
  return (
    <div className="page" data-testid="page">
      <Header />
      <div className="container" data-testid="container">
        {props.children}
      </div>
    </div>
  )
}