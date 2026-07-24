import React, { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Integrate with error tracking service (e.g., Sentry, LogRocket)
      console.error('Production error:', error.message);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    const { hasError, error } = this.state;
    const { children, darkMode, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback(error);
      }

      return (
        <div 
          className={`min-h-screen flex items-center justify-center p-4 ${
            darkMode ? 'bg-gray-900' : 'bg-gray-50'
          }`}
          role="alert"
          aria-live="assertive"
        >
          <div 
            className={`max-w-md w-full p-6 rounded-xl border-2 text-center ${
              darkMode 
                ? 'bg-gray-800 border-red-700' 
                : 'bg-white border-red-200'
            }`}
          >
            <AlertTriangle 
              size={48} 
              className={`mx-auto mb-4 ${
                darkMode ? 'text-red-400' : 'text-red-600'
              }`}
              aria-hidden="true"
            />
            <h1 
              className={`text-2xl font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Something Went Wrong
            </h1>
            <p 
              className={`mb-4 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={this.handleReset}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                darkMode
                  ? 'bg-blue-700 hover:bg-blue-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
              aria-label="Try again"
            >
              <RefreshCw size={20} />
              Try Again
            </button>
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details 
                className={`mt-4 text-left ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <summary className="cursor-pointer mb-2">Error Details (Development)</summary>
                <pre className="text-xs overflow-auto p-3 bg-gray-900 text-gray-100 rounded">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
