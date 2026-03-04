import React, { Component, ErrorInfo, ReactNode } from 'react';
import FallbackPlaceholder from './FallbackPlaceholder';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Uncaught error in ${this.props.name || 'Component'}:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8">
          <FallbackPlaceholder 
            type="component" 
            message={`${this.props.name || 'Component'} failed to load`}
            className="w-full min-h-[200px]"
          />
        </div>
      );
    }

    return this.props.children;
  }
}
