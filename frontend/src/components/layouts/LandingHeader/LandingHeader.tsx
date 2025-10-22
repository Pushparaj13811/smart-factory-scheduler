// Landing page header component

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { Factory } from 'lucide-react';

export function LandingHeader() {
  const { t } = useTranslation(['landing', 'common']);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="rounded-lg bg-primary p-2">
            <Factory className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">{t('appName')}</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button variant="ghost" asChild>
            <Link to="/login">{t('common:actions.login')}</Link>
          </Button>
          <Button asChild className="shadow-md">
            <Link to="/register-industry">{t('hero.cta.demo')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
