// Smart Factory Scheduler - Modern Animated Landing Page

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Cpu,
  Pill,
  Car,
  Shirt,
  Sandwich,
  Droplet,
  Settings,
  BarChart3,
  Calendar,
  TrendingUp,
  Clock,
  Activity,
  CheckCircle,
  Rocket,
  Check,
  Video,
  Sparkles,
  Quote,
} from 'lucide-react';
import { LandingHeader } from '@/components/layouts/LandingHeader/LandingHeader';
import { LandingFooter } from '@/components/layouts/LandingFooter/LandingFooter';

export default function LandingPage() {
  const { t } = useTranslation(['landing', 'common']);

  const industries = [
    { icon: Car, name: t('industries.automotive') },
    { icon: Cpu, name: t('industries.electronics') },
    { icon: Shirt, name: t('industries.textile') },
    { icon: Pill, name: t('industries.pharmaceutical') },
    { icon: Sandwich, name: t('industries.foodBeverage') },
    { icon: Droplet, name: t('industries.chemical') },
  ];

  const features = [
    {
      icon: Settings,
      title: t('features.ai.title'),
      description: t('features.ai.description'),
      benefits: [
        { title: t('features.ai.benefit1Title'), desc: t('features.ai.benefit1Description') },
        { title: t('features.ai.benefit2Title'), desc: t('features.ai.benefit2Description') },
        { title: t('features.ai.benefit3Title'), desc: t('features.ai.benefit3Description') },
      ],
      gradient: 'from-primary to-primary/70',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    },
    {
      icon: BarChart3,
      title: t('features.analytics.title'),
      description: t('features.analytics.description'),
      benefits: [
        { title: t('features.analytics.benefit1Title'), desc: t('features.analytics.benefit1Description') },
        { title: t('features.analytics.benefit2Title'), desc: t('features.analytics.benefit2Description') },
        { title: t('features.analytics.benefit3Title'), desc: t('features.analytics.benefit3Description') },
      ],
      gradient: 'from-success to-success/70',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    },
    {
      icon: Calendar,
      title: t('features.scheduling.title'),
      description: t('features.scheduling.description'),
      benefits: [
        { title: t('features.scheduling.benefit1Title'), desc: t('features.scheduling.benefit1Description') },
        { title: t('features.scheduling.benefit2Title'), desc: t('features.scheduling.benefit2Description') },
        { title: t('features.scheduling.benefit3Title'), desc: t('features.scheduling.benefit3Description') },
      ],
      gradient: 'from-accent to-accent/70',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-primary/20"
              animate={{
                x: [Math.random() * 100 - 50, Math.random() * 100 + 50],
                y: [Math.random() * 100 - 50, Math.random() * 100 + 50],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Gradient orbs for depth */}
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="container mx-auto max-w-7xl px-6 py-20 relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.4fr]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6 inline-block"
              >
                <Badge className="bg-primary/10 px-4 py-2 text-primary hover:bg-primary/20">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {t('hero.badge')}
                  </span>
                </Badge>
              </motion.div>

              <h1 className="mb-6 bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl lg:text-6xl">
                {t('hero.title')}
              </h1>

              <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">
                {t('hero.subtitle')}
              </p>

              <div className="mb-8 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  asChild
                  className="h-12 bg-gradient-to-r from-primary to-primary/80 px-8 text-base font-medium shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
                >
                  <Link to="/register-industry">
                    <Rocket className="mr-2 h-5 w-5" />
                    {t('hero.cta.trial')}
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="h-12 border-2 border-primary px-8 text-base font-medium text-primary hover:bg-primary hover:text-white"
                >
                  <Link to="/login">
                    <Video className="mr-2 h-5 w-5" />
                    {t('hero.cta.demo')}
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>{t('hero.trust.freeTrial')} {t('hero.trust.freeTrialValue')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>{t('hero.trust.noCreditCard')}</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:scale-110 lg:translate-x-8"
            >
              <div className="relative">
                {/* Gradient glow effect behind image */}
                <div className="absolute -inset-8 rounded-3xl bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-3xl opacity-60" />

                {/* Main image with modern styling */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <motion.img
                    src="https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg"
                    alt="Smart Factory Manufacturing"
                    className="w-full h-auto min-h-[500px] object-cover"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
                </div>

                {/* Floating stats - repositioned */}
                <motion.div
                  className="absolute -bottom-6 -left-6 rounded-2xl border border-white/20 bg-white/95 p-5 shadow-2xl backdrop-blur-sm"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-success to-success/70 p-3">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-500">{t('hero.metrics.efficiencyBoost')}</div>
                      <div className="text-2xl font-bold text-slate-900">+94%</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -right-6 -top-6 rounded-2xl border border-white/20 bg-white/95 p-5 shadow-2xl backdrop-blur-sm"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-primary to-accent p-3">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-500">{t('hero.metrics.onTimeDelivery')}</div>
                      <div className="text-2xl font-bold text-slate-900">98%</div>
                    </div>
                  </div>
                </motion.div>

                {/* Additional floating badge */}
                <motion.div
                  className="absolute bottom-1/4 -right-4 rounded-full border border-white/20 bg-white/95 px-4 py-2 shadow-xl backdrop-blur-sm"
                  animate={{ x: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-semibold text-slate-900">{t('hero.metrics.liveProduction')}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Trust Logos */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-sm font-medium uppercase tracking-wider text-slate-500"
          >
            {t('trust.heading')}
          </motion.p>

          <div className="grid grid-cols-3 gap-6 md:grid-cols-6 lg:gap-8">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex h-20 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <Icon className="h-8 w-8 text-slate-400" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Introduction */}
      <section className="relative bg-gradient-to-b from-white via-slate-50/50 to-blue-50/40 py-32">
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <div className="container relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <Badge className="mb-6 bg-gradient-to-r from-primary to-accent px-6 py-2 text-white shadow-lg">
              {t('features.title')}
            </Badge>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              {t('features.heading')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">{t('features.subtitle')}</p>
          </motion.div>

          {/* 3 Feature Highlight Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-90 transition-opacity group-hover:opacity-100`} />
                <div className="absolute bottom-0 p-6 text-white">
                  <div className="mb-3 inline-flex rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold">{feature.title}</h3>
                  <p className="text-sm text-white/90">{feature.description.substring(0, 60)}...</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features - Detailed */}
      <section className="relative bg-gradient-to-b from-white to-slate-50/50 py-32">
        {/* Decorative elements */}
        <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-success/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

        <div className="container relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <h2 className="mb-6 bg-gradient-to-r from-slate-900 via-primary to-slate-900 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
              {t('features.coreTitle')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              {t('features.coreSubtitle')}
            </p>
          </motion.div>

          <div className="space-y-24">
            {features.map((feature, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="grid items-center gap-12 lg:grid-cols-2"
                >
                  <div className={!isEven ? 'lg:order-2' : ''}>
                    <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient}`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-slate-900">{feature.title}</h3>
                    <p className="mb-6 text-lg leading-relaxed text-slate-600">{feature.description}</p>
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${feature.gradient}`}>
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{benefit.title}</div>
                            <div className="text-sm text-slate-600">{benefit.desc}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={!isEven ? 'lg:order-1' : ''}>
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-10 blur-3xl`} />
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="relative w-full rounded-2xl border border-slate-200 shadow-2xl"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30 py-32">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <Badge className="mb-6 bg-gradient-to-r from-success to-primary px-6 py-2 text-white shadow-lg">
              {t('results.badge')}
            </Badge>
            <h2 className="mb-6 bg-gradient-to-r from-slate-900 via-primary to-slate-900 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
              {t('results.title')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              {t('results.subtitle')}
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {(['planning', 'downtime', 'efficiency', 'accuracy'] as const).map((key, index) => {
              const icons = [TrendingUp, Clock, Activity, CheckCircle2];
              const gradients = ['from-primary to-primary/70', 'from-success to-success/70', 'from-accent to-accent/70', 'from-warning to-warning/70'];
              const Icon = icons[index];

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <Card className="border-0 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl">
                    <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[index]}`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className={`mb-2 bg-gradient-to-r ${gradients[index]} bg-clip-text text-4xl font-bold text-transparent`}>
                      {t(`results.${key}.value`)}
                    </div>
                    <div className="mb-2 text-lg font-semibold text-slate-900">{t(`results.${key}.label`)}</div>
                    <div className="mb-4 text-sm text-slate-600">{t(`results.${key}.description`)}</div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: t(`results.${key}.value`) }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        className={`h-full rounded-full bg-gradient-to-r ${gradients[index]}`}
                      />
                    </div>
                  </Card>
                  <div className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r ${gradients[index]} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative bg-white py-32">
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent" />

        <div className="container relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <Badge className="mb-6 bg-success/10 px-6 py-2 text-success">{t('testimonials.badge')}</Badge>
            <h2 className="mb-6 bg-gradient-to-r from-slate-900 via-success to-slate-900 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
              {t('testimonials.title')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">{t('testimonials.subtitle')}</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {(['testimonial1', 'testimonial2', 'testimonial3'] as const).map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <Card className="h-full border-2 border-slate-100 bg-white p-8 shadow-lg transition-all duration-300 hover:border-primary/30 hover:shadow-2xl">
                  <Quote className="mb-6 h-10 w-10 text-primary/20" />

                  <p className="mb-6 text-base leading-relaxed text-slate-700">
                    "{t(`testimonials.${key}.content`)}"
                  </p>

                  <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-lg font-bold text-white">
                      {t(`testimonials.${key}.name`).charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{t(`testimonials.${key}.name`)}</div>
                      <div className="text-sm text-slate-600">{t(`testimonials.${key}.role`)}</div>
                      <div className="text-sm text-primary">{t(`testimonials.${key}.company`)}</div>
                    </div>
                  </div>
                </Card>
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative bg-gradient-to-b from-slate-50 via-blue-50/40 to-white py-32">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

        <div className="container relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <Badge className="mb-6 bg-primary/10 px-6 py-2 text-primary">{t('pricing.badge')}</Badge>
            <h2 className="mb-6 bg-gradient-to-r from-slate-900 via-primary to-slate-900 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
              {t('pricing.title')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">{t('pricing.subtitle')}</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {(['starter', 'professional', 'enterprise'] as const).map((plan, index) => {
              const isProfessional = plan === 'professional';

              return (
                <motion.div
                  key={plan}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {isProfessional && (
                    <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
                      <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-white shadow-lg">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm">{t('pricing.professional.badge')}</span>
                      </div>
                    </div>
                  )}

                  <Card
                    className={`h-full p-8 transition-all duration-300 hover:shadow-2xl ${
                      isProfessional ? 'scale-105 border-2 border-primary shadow-xl' : 'border-2 border-slate-200'
                    }`}
                  >
                    <div className="mb-6">
                      <h3 className="mb-2 text-2xl font-bold">{t(`pricing.${plan}.name`)}</h3>
                      <p className="mb-4 text-sm text-slate-600">{t(`pricing.${plan}.description`)}</p>

                      <div className="mb-6 flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-slate-900">{t(`pricing.${plan}.price`)}</span>
                        {plan !== 'enterprise' && <span className="text-slate-600">{t(`pricing.${plan}.period`)}</span>}
                      </div>

                      <Button
                        className={`w-full ${
                          isProfessional
                            ? 'bg-gradient-to-r from-primary to-accent hover:shadow-lg'
                            : 'bg-slate-900 hover:bg-slate-800'
                        }`}
                        asChild
                      >
                        <Link to={plan === 'enterprise' ? '/login' : '/register-industry'}>
                          {t(`pricing.${plan}.cta`)}
                        </Link>
                      </Button>
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <div className="mb-4 text-sm text-slate-500">What's included:</div>
                      <ul className="space-y-3">
                        {t(`pricing.${plan}.features`, { returnObjects: true }).map((feature: string, i: number) => (
                          <li key={i} className="flex items-start gap-3">
                            <div
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                                isProfessional ? 'bg-gradient-to-br from-primary to-accent' : 'bg-slate-900'
                              }`}
                            >
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm text-slate-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-accent py-32 text-white">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute right-0 top-0 h-96 w-96 rounded-full bg-white blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-white blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

        <div className="container relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="mb-8 inline-block"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Rocket className="h-16 w-16" />
            </motion.div>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">{t('cta.title')}</h2>
            <p className="mb-12 text-xl opacity-95">{t('cta.subtitle')}</p>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                asChild
                className="h-14 bg-white px-8 text-base font-medium text-primary shadow-lg hover:bg-slate-50"
              >
                <Link to="/register-industry">{t('cta.trial')}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 border-2 border-white bg-transparent px-8 text-base font-medium text-white hover:bg-white/10"
              >
                <Link to="/login">{t('cta.sales')}</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm">
              {(['noCard', 'implementation', 'support'] as const).map((key) => (
                <div key={key} className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>{t(`cta.features.${key}`)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
