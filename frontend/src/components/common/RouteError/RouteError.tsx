// Route error component for React Router errorElement

import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Home } from 'lucide-react';
import { useState } from 'react';

export function RouteError() {
  const error = useRouteError();
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const handleGoHome = (): void => {
    navigate('/');
  };

  const handleReload = (): void => {
    window.location.reload();
  };

  let errorMessage = t('errors.routeMessage');
  let errorStatus = '';
  let errorDetails = '';

  if (isRouteErrorResponse(error)) {
    errorStatus = `${error.status} ${error.statusText}`;
    errorMessage = error.data?.message || errorMessage;
    errorDetails = error.data?.details || '';
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack || '';
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-2xl">
                {errorStatus || t('errors.routeTitle')}
              </CardTitle>
              <CardDescription className="mt-2">{errorMessage}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleGoHome}>
              <Home className="mr-2 h-4 w-4" />
              {t('errors.goHome')}
            </Button>
            <Button variant="outline" onClick={handleReload}>
              {t('errors.reload')}
            </Button>
            {errorDetails && (
              <Button variant="ghost" onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? t('errors.hideDetails') : t('errors.showDetails')}
              </Button>
            )}
          </div>

          {showDetails && errorDetails && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <h3 className="mb-2 font-semibold">Error Details:</h3>
              <pre className="overflow-auto text-xs text-muted-foreground">{errorDetails}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
