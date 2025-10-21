// Error state component

import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useTranslation } from 'react-i18next';

interface ErrorStateProps {
  title?: string;
  message: string;
  retry?: () => void;
  fullScreen?: boolean;
}

export function ErrorState({
  title,
  message,
  retry,
  fullScreen = false,
}: ErrorStateProps) {
  const { t } = useTranslation('common');
  const displayTitle = title || t('states.error');
  const content = (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{displayTitle}</AlertTitle>
      <AlertDescription className="mt-2">
        <p>{message}</p>
        {retry && (
          <Button variant="outline" size="sm" onClick={retry} className="mt-4">
            {t('actions.tryAgain')}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );

  if (fullScreen) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background p-8">
        <div className="w-full max-w-md">{content}</div>
      </div>
    );
  }

  return <div className="p-4">{content}</div>;
}
