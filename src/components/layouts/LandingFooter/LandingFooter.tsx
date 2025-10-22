// Landing page footer component

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Factory, Linkedin, Twitter, Github, Youtube, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LandingFooter() {
  const { t } = useTranslation('landing');

  const footerLinks = {
    product: [
      { label: t('footer.features'), href: '#features' },
      { label: t('footer.pricing'), href: '#pricing' },
      { label: t('footer.integrations'), href: '#integrations' },
      { label: t('footer.demo'), href: '/login' },
    ],
    company: [
      { label: t('footer.about'), href: '#about' },
      { label: t('footer.careers'), href: '#careers' },
      { label: t('footer.blog'), href: '#blog' },
      { label: t('footer.contact'), href: '#contact' },
    ],
    resources: [
      { label: t('footer.documentation'), href: '#docs' },
      { label: t('footer.helpCenter'), href: '#help' },
      { label: t('footer.community'), href: '#community' },
      { label: t('footer.tutorials'), href: '#tutorials' },
    ],
    legal: [
      { label: t('footer.privacy'), href: '#privacy' },
      { label: t('footer.terms'), href: '#terms' },
      { label: t('footer.security'), href: '#security' },
      { label: t('footer.compliance'), href: '#compliance' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand Section - Takes more space */}
          <div className="lg:col-span-4">
            <Link to="/" className="mb-6 inline-flex items-center gap-2 transition-transform hover:scale-105">
              <div className="rounded-xl bg-gradient-to-br from-primary to-accent p-2.5 shadow-lg">
                <Factory className="h-7 w-7 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">{t('appName')}</span>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-600">{t('footer.description')}</p>

            {/* Newsletter Subscription */}
            <div className="mb-6">
              <h4 className="mb-3 text-sm font-semibold text-slate-900">{t('footer.newsletter')}</h4>
              <p className="mb-4 text-sm text-slate-600">{t('footer.newsletterDescription')}</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t('footer.emailPlaceholder')}
                  className="h-10 flex-1 border-slate-300 bg-white"
                />
                <Button className="h-10 bg-gradient-to-r from-primary to-accent px-6 shadow-md hover:shadow-lg">
                  {t('footer.subscribe')}
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-slate-900">{t('footer.social')}</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:border-primary hover:bg-primary hover:text-white hover:shadow-md"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {/* Product */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-slate-900">{t('footer.product')}</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-slate-900">{t('footer.company')}</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-slate-900">{t('footer.resources')}</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-slate-900">{t('footer.legal')}</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-600 sm:flex-row">
            <div className="flex items-center gap-2">
              <span>
                &copy; {new Date().getFullYear()} {t('appName')}. {t('footer.rights')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>{t('footer.madeWith')}</span>
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              <span>{t('footer.in')}</span>
              <span className="font-semibold text-primary">{t('footer.india')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
