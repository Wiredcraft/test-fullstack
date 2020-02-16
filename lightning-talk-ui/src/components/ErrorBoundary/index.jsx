/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong...</h1>;
    }

    return this.props.children;
  }
}
