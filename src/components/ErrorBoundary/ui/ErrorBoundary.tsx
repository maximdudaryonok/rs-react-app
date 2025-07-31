import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorElement } from './ErrorElement';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: '',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorElement errorInfo={this.state.errorInfo} />;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
