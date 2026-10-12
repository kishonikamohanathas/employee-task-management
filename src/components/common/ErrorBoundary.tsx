import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorPage } from '../../pages/ErrorPage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught banking application error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public handleGoHome = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          errorCode="ERR-500-RUNTIME_EXCEPTION"
          title="Banking Operational Interface Exception"
          message={
            this.state.error?.message ||
            'An unexpected application state occurred in the secure banking client. The transaction session has been safely isolated.'
          }
          onReset={this.handleReset}
          onGoHome={this.handleGoHome}
        />
      );
    }

    return this.props.children;
  }
}
