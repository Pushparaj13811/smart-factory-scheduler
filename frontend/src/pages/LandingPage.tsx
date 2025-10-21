// Smart Factory Scheduler - Professional Landing Page

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Factory,
  BarChart3,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Cpu,
  TrendingUp,
  Clock,
  Pill,
  Car,
  Shirt,
  Sandwich,
  Droplet,
  Wrench,
  Package,
  Quote,
  Star,
  Play,
  ChevronRight,
} from 'lucide-react';

export default function LandingPage() {
  const { t } = useTranslation(['landing', 'common']);
  const [hoveredIndustry, setHoveredIndustry] = useState<number | null>(null);

  const industries = [
    { icon: Car, name: t('industries.automotive') },
    { icon: Cpu, name: t('industries.electronics') },
    { icon: Shirt, name: t('industries.textile') },
    { icon: Pill, name: t('industries.pharmaceutical') },
    { icon: Sandwich, name: t('industries.foodBeverage') },
    { icon: Droplet, name: t('industries.chemical') },
    { icon: Wrench, name: t('industries.metalMining') },
    { icon: Package, name: t('industries.logistics') },
  ];

  const industryColors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-cyan-500',
    'bg-slate-500',
    'bg-amber-500',
  ];

  const testimonials = [
    {
      ...t('testimonials.testimonial1', { returnObjects: true }),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    },
    {
      ...t('testimonials.testimonial2', { returnObjects: true }),
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    },
    {
      ...t('testimonials.testimonial3', { returnObjects: true }),
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#1a1a1a]">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded bg-primary p-1.5">
              <Factory className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">{t('appName')}</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="text-slate-300 hover:text-white">
              <Link to="/login">{t('common:actions.login')}</Link>
            </Button>
            <Button asChild>
              <Link to="/register-industry">{t('hero.cta.demo')}</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-[#1a1a1a] py-24 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-[1.2fr,1fr]">
            {/* Left Content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-slate-300">{t('hero.badge')}</span>
              </div>

              <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight lg:text-6xl">
                {t('hero.title')}
              </h1>

              <p className="mb-8 text-xl leading-relaxed text-slate-400">
                {t('hero.subtitle')}
              </p>

              <div className="mb-12 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild className="text-base">
                  <Link to="/register-industry">
                    {t('hero.cta.trial')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-slate-600 text-base text-white hover:bg-slate-800">
                  <Link to="/login">
                    <Play className="mr-2 h-5 w-5" />
                    {t('hero.cta.demo')}
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-8 border-t border-slate-800 pt-8">
                <div>
                  <div className="mb-1 text-sm text-slate-500">{t('hero.trust.freeTrial')}</div>
                  <div className="text-2xl font-bold">{t('hero.trust.freeTrialValue')}</div>
                </div>
                <div>
                  <div className="mb-1 text-sm text-slate-500">{t('hero.trust.implementation')}</div>
                  <div className="text-2xl font-bold">{t('hero.trust.implementationValue')}</div>
                </div>
                <div>
                  <div className="mb-1 text-sm text-slate-500">{t('hero.trust.support')}</div>
                  <div className="text-2xl font-bold">{t('hero.trust.supportValue')}</div>
                </div>
              </div>
            </div>

            {/* Right Product Mockup */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=90"
                  alt="Dashboard Analytics"
                  className="w-full"
                />
                {/* Floating Metric Card */}
                <div className="absolute -left-4 top-8 rounded-lg border border-slate-700 bg-slate-900/95 p-4 shadow-xl backdrop-blur">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-slate-400">{t('hero.metrics.efficiency')}</span>
                  </div>
                  <div className="text-3xl font-bold text-white">{t('hero.metrics.efficiencyValue')}</div>
                  <div className="text-xs text-green-500">{t('hero.metrics.efficiencyChange')}</div>
                </div>
                {/* Floating Schedule Card */}
                <div className="absolute -bottom-4 -right-4 rounded-lg border border-slate-700 bg-slate-900/95 p-4 shadow-xl backdrop-blur">
                  <div className="mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-xs text-slate-400">{t('hero.metrics.planning')}</span>
                  </div>
                  <div className="text-3xl font-bold text-white">{t('hero.metrics.planningValue')}</div>
                  <div className="text-xs text-slate-500">{t('hero.metrics.planningChange')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-slate-900">{t('industries.title')}</h2>
            <p className="text-lg text-slate-600">{t('industries.subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <button
                  key={index}
                  onMouseEnter={() => setHoveredIndustry(index)}
                  onMouseLeave={() => setHoveredIndustry(null)}
                  className="group relative overflow-hidden rounded-lg border-2 border-slate-200 bg-white p-6 text-left transition-all hover:border-slate-300 hover:shadow-lg"
                >
                  <div className={`mb-4 inline-flex rounded-lg ${industryColors[index]} p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-base font-semibold text-slate-900">{industry.name}</div>
                  <ChevronRight
                    className={`absolute bottom-4 right-4 h-5 w-5 text-slate-400 transition-transform ${
                      hoveredIndustry === index ? 'translate-x-1' : ''
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="bg-white py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-20 max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">{t('features.title')}</h2>
            <p className="text-lg text-slate-600">{t('features.subtitle')}</p>
          </div>

          {/* Feature 1 - Image Right */}
          <div className="mb-24 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex rounded-lg bg-blue-50 p-3">
                <Cpu className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900">{t('features.ai.title')}</h3>
              <p className="mb-6 text-lg leading-relaxed text-slate-600">{t('features.ai.description')}</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <div className="font-semibold text-slate-900">{t('features.ai.benefit1Title')}</div>
                    <div className="text-sm text-slate-600">{t('features.ai.benefit1Description')}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <div className="font-semibold text-slate-900">{t('features.ai.benefit2Title')}</div>
                    <div className="text-sm text-slate-600">{t('features.ai.benefit2Description')}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <div className="font-semibold text-slate-900">{t('features.ai.benefit3Title')}</div>
                    <div className="text-sm text-slate-600">{t('features.ai.benefit3Description')}</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-lg border border-slate-200 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1581093458791-9d42e3f6d2e0?w=800&q=80"
                  alt="AI Optimization Dashboard"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Feature 2 - Image Left */}
          <div className="mb-24 grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-lg border border-slate-200 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                  alt="Real-Time Analytics Dashboard"
                  className="w-full"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="mb-6 inline-flex rounded-lg bg-purple-50 p-3">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900">{t('features.analytics.title')}</h3>
              <p className="mb-6 text-lg leading-relaxed text-slate-600">{t('features.analytics.description')}</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <div className="font-semibold text-slate-900">{t('features.analytics.benefit1Title')}</div>
                    <div className="text-sm text-slate-600">{t('features.analytics.benefit1Description')}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <div className="font-semibold text-slate-900">{t('features.analytics.benefit2Title')}</div>
                    <div className="text-sm text-slate-600">{t('features.analytics.benefit2Description')}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <div className="font-semibold text-slate-900">{t('features.analytics.benefit3Title')}</div>
                    <div className="text-sm text-slate-600">{t('features.analytics.benefit3Description')}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 3 - Image Right */}
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex rounded-lg bg-green-50 p-3">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900">{t('features.scheduling.title')}</h3>
              <p className="mb-6 text-lg leading-relaxed text-slate-600">{t('features.scheduling.description')}</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <div className="font-semibold text-slate-900">{t('features.scheduling.benefit1Title')}</div>
                    <div className="text-sm text-slate-600">{t('features.scheduling.benefit1Description')}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <div className="font-semibold text-slate-900">{t('features.scheduling.benefit2Title')}</div>
                    <div className="text-sm text-slate-600">{t('features.scheduling.benefit2Description')}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <div className="font-semibold text-slate-900">{t('features.scheduling.benefit3Title')}</div>
                    <div className="text-sm text-slate-600">{t('features.scheduling.benefit3Description')}</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-lg border border-slate-200 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
                  alt="Visual Schedule Management"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="border-b border-slate-200 bg-white py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <Badge className="mb-4 border-green-200 bg-green-50 text-green-700">{t('results.badge')}</Badge>
            <h2 className="mb-3 text-3xl font-bold text-slate-900">{t('results.title')}</h2>
            <p className="text-lg text-slate-600">{t('results.subtitle')}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {(['planning', 'downtime', 'efficiency', 'accuracy'] as const).map((key) => (
              <div key={key} className="rounded-lg border-2 border-slate-200 bg-slate-50 p-6 text-center">
                <div className="mb-2 text-4xl font-bold text-primary">{t(`results.${key}.value`)}</div>
                <div className="mb-1 text-base font-semibold text-slate-900">{t(`results.${key}.label`)}</div>
                <div className="text-sm text-slate-600">{t(`results.${key}.description`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <Badge className="mb-4 border-blue-200 bg-blue-50 text-blue-700">{t('testimonials.badge')}</Badge>
            <h2 className="mb-3 text-3xl font-bold text-slate-900">{t('testimonials.title')}</h2>
            <p className="text-lg text-slate-600">{t('testimonials.subtitle')}</p>
          </div>

          <Carousel className="mx-auto w-full max-w-4xl">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="border-2 border-slate-200">
                    <CardContent className="p-10">
                      <Quote className="mb-6 h-10 w-10 text-primary/20" />
                      <p className="mb-8 text-lg leading-relaxed text-slate-700">{testimonial.content}</p>
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-14 w-14 rounded-full border-2 border-slate-200 object-cover"
                        />
                        <div>
                          <div className="font-semibold text-slate-900">{testimonial.name}</div>
                          <div className="text-sm text-slate-600">{testimonial.role}</div>
                          <div className="text-sm text-slate-500">{testimonial.company}</div>
                        </div>
                        <div className="ml-auto flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-4xl font-bold">{t('cta.title')}</h2>
          <p className="mb-10 text-xl opacity-95">{t('cta.subtitle')}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="bg-white text-primary hover:bg-slate-100">
              <Link to="/register-industry">
                {t('cta.trial')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-2 border-white bg-transparent text-white hover:bg-white/10">
              <Link to="/login">{t('cta.sales')}</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>{t('cta.features.noCard')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>{t('cta.features.implementation')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>{t('cta.features.support')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#1a1a1a] py-12 text-slate-400">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link to="/" className="mb-4 inline-flex items-center gap-2">
                <div className="rounded bg-primary p-1.5">
                  <Factory className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-white">{t('appName')}</span>
              </Link>
              <p className="mb-4 max-w-sm text-sm leading-relaxed">{t('footer.description')}</p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{t('footer.product')}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    {t('footer.features')}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t('footer.pricing')}
                  </a>
                </li>
                <li>
                  <Link to="/register-industry" className="hover:text-white">
                    {t('footer.getStarted')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{t('footer.company')}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    {t('footer.about')}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t('footer.contact')}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t('footer.support')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} {t('appName')}. {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
