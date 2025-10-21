// Footer component

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation('navigation');

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-4 text-sm">
            <Link to="/about" className="text-muted-foreground hover:text-foreground">
              {t('footer.about')}
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground">
              {t('footer.terms')}
            </Link>
            <Link to="/support" className="text-muted-foreground hover:text-foreground">
              {t('footer.support')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
