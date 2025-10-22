// Error Boundary component for catching React errors

import React, { Component, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  onReset: () => void;
}

function ErrorFallback({ error, errorInfo, onReset }: ErrorFallbackProps) {
  const { t } = useTranslation('common');
  const [showDetails, setShowDetails] = React.useState(false);

  const handleReload = (): void => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-2xl">{t('errors.pageTitle')}</CardTitle>
              <CardDescription className="mt-2">{t('errors.pageMessage')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleReload}>{t('errors.reload')}</Button>
            <Button variant="outline" onClick={onReset}>
              {t('actions.tryAgain')}
            </Button>
            <Button variant="ghost" onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? t('errors.hideDetails') : t('errors.showDetails')}
            </Button>
          </div>

          {showDetails && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <h3 className="mb-2 font-semibold">Error Details:</h3>
              {error && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-destructive">{error.toString()}</p>
                </div>
              )}
              {errorInfo && (
                <div>
                  <p className="mb-1 text-sm font-medium">Component Stack:</p>
                  <pre className="overflow-auto text-xs text-muted-foreground">
                    {errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  return (
    <ErrorBoundaryClass fallback={fallback}>
      {children}
    </ErrorBoundaryClass>
  );
}
