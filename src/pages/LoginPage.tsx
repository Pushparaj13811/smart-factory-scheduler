// Login page placeholder

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t('auth.login', 'Login')}</CardTitle>
          <CardDescription>
            Welcome to Smart Factory Scheduler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-muted p-4 text-center text-sm text-muted-foreground">
            Login form will be implemented in Phase 2
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
