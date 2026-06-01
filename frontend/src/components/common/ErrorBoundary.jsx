import React, { Component } from 'react';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg p-6 transition-colors duration-300">
          <div className="max-w-md w-full bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-8 shadow-xl text-center">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-950/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
              <ReportProblemOutlinedIcon sx={{ fontSize: 36 }} />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">
              Something went wrong
            </h1>
            
            <p className="text-gray-500 dark:text-dark-muted mb-6">
              An unexpected error occurred in the application. Please reload or return to safety.
            </p>
            
            {this.state.error && (
              <div className="text-left text-xs font-mono bg-gray-100 dark:bg-dark-bg/60 p-4 rounded-xl text-red-600 dark:text-red-400 overflow-auto max-h-40 mb-6">
                {this.state.error.toString()}
              </div>
            )}
            
            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 px-5 py-3 rounded-xl border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium text-sm"
              >
                Reload Page
              </button>
              
              <button
                onClick={this.handleReset}
                className="flex-1 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-primary-500/25"
              >
                Back to Safety
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
