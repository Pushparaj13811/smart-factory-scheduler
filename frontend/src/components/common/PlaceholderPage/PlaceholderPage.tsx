// Placeholder page component for features under development

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: LucideIcon;
}

export function PlaceholderPage({ title, description, icon: Icon }: PlaceholderPageProps) {
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const handleGoBack = (): void => {
    navigate('/');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              {Icon ? <Icon className="h-8 w-8 text-primary" /> : <Construction className="h-8 w-8 text-primary" />}
            </div>
            <div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription className="mt-2">{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {t('placeholder.underDevelopment')}
            </p>
            <Button onClick={handleGoBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('placeholder.backToDashboard')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
