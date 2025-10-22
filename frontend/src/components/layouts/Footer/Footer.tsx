// Footer component for authenticated pages

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation('navigation');

  const footerLinks = [
    { label: t('footer.about'), to: '/about' },
    { label: t('footer.documentation'), to: '/docs', external: true },
    { label: t('footer.helpCenter'), to: '/help', external: true },
    { label: t('footer.contact'), to: '/contact' },
    { label: t('footer.privacy'), to: '/privacy' },
    { label: t('footer.terms'), to: '/terms' },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-6 py-6">
        {/* Main Footer Content */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left Side - Copyright and Made with Love */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{t('footer.madeWith')}</span>
              <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
              <span>{t('footer.in')}</span>
              <span className="font-semibold text-primary">{t('footer.india')}</span>
            </div>
          </div>

          {/* Right Side - Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {link.label}
                {link.external && (
                  <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Optional: Version info for development */}
        {import.meta.env.DEV && (
          <div className="mt-4 border-t pt-4">
            <p className="text-xs text-muted-foreground">
              {t('footer.version')} {import.meta.env.VITE_APP_VERSION || '1.0.0'} (Development)
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
