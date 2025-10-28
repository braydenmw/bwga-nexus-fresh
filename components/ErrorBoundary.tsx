import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  // FIX: Switched from a class property for state to a constructor.
  // Explicitly calling super(props) and setting state in the constructor can resolve issues
  // in some build environments where `this.props` is not correctly recognized on the component type.
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-nexus-primary-900 text-nexus-text-primary p-4">
            <div className="max-w-2xl w-full text-center bg-nexus-surface-800 p-8 rounded-lg border border-red-500/50 shadow-lg">
                <h1 className="text-3xl font-bold text-red-400">Application Error</h1>
                <p className="mt-4 text-nexus-text-secondary">
                    Sorry, something went wrong. A critical error has occurred, and the application cannot continue.
                </p>
                <p className="mt-2 text-sm text-nexus-text-muted">
                    Please try refreshing the page. If the problem persists, please contact support.
                </p>
                {this.state.error && (
                    <pre className="mt-6 p-4 bg-nexus-primary-900 rounded-md text-left text-xs text-red-300 overflow-auto max-h-40">
                        {this.state.error.toString()}
                    </pre>
                )}
                 <button
                    onClick={() => window.location.reload()}
                    className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    Refresh Page
                </button>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}
