import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    const { children, msg } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <p>{msg}</p>;
    } else {
      return children;
    }

  }
};

export default ErrorBoundary;
