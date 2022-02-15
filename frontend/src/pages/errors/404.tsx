import React from 'react';
import { Link } from 'react-router-dom';

export default class Error404 extends React.Component {
  render() {
    return (
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-6xl">404</h1>
        <p className="text-md">Sorry, that URL cannot be found.</p>
        <Link to="/" className="text-black text-bold underline">Return to Home</Link>
      </div>
    );
  }
}
