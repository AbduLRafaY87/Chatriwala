import React from 'react';
import './ErrorBoundary.css';

/**
 * ErrorBoundary
 * Catches render errors in its child tree and shows a fallback UI
 * instead of a blank white screen. Wrap your app (or a risky section) with it:
 *
 *   <ErrorBoundary>
 *     <App />
 *   </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Swap for a logging service if you want this reported somewhere
    console.error('ErrorBoundary caught:', error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <p className="error-boundary__code">// something broke</p>
          <h2 className="error-boundary__title">Unexpected error</h2>
          <p className="error-boundary__text">
            This section failed to load. Try refreshing the page.
          </p>
          <button className="btn btn-primary" onClick={this.handleReload}>
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
