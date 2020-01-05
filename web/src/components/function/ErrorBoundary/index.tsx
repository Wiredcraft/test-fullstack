import React from "react";

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // TODO log error to server
    // maybe use sentry
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return <div>Something went wrong.</div>;
    }

    return children;
  }
}

export default ErrorBoundary;
