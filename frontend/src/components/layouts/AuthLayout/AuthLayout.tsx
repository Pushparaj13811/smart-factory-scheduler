// AuthLayout component for authentication pages

import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Factory } from 'lucide-react';

export function AuthLayout() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden w-1/2 bg-gradient-to-br from-primary/90 to-primary lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-2 text-white">
          <Factory className="h-8 w-8" />
          <span className="text-2xl font-bold">Smart Factory</span>
        </div>

        <div className="space-y-6 text-white">
          <h1 className="text-4xl font-bold leading-tight">
            {i18n.language === 'hi' ? 'अपने विनिर्माण संचालन को अनुकूलित करें' : 'Optimize Your Manufacturing Operations'}
          </h1>
          <p className="text-lg text-white/90">
            {i18n.language === 'hi' ? 'जेनेटिक एल्गोरिदम अनुकूलन द्वारा संचालित बुद्धिमान मशीन टास्क शेड्यूलिंग' : 'Intelligent machine task scheduling powered by Genetic Algorithm optimization.'}
          </p>
          <div className="grid gap-4 pt-6">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-white" />
              <p className="text-white/90">{i18n.language === 'hi' ? 'उद्योगों के लिए मल्टी-टेनेंट SaaS प्लेटफ़ॉर्म' : 'Multi-tenant SaaS platform for industries'}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-white" />
              <p className="text-white/90">{i18n.language === 'hi' ? 'AI-संचालित शेड्यूलिंग अनुकूलन' : 'AI-powered scheduling optimization'}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-white" />
              <p className="text-white/90">{i18n.language === 'hi' ? 'रीयल-टाइम उत्पादन ट्रैकिंग' : 'Real-time production tracking'}</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-white/70">
          © 2025 Smart Factory Scheduler. {i18n.language === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
        </div>
      </div>

      {/* Right side - Auth content */}
      <div className="flex w-full flex-col lg:w-1/2">
        {/* Language switcher */}
        <div className="flex justify-end gap-2 p-4">
          <button
            onClick={() => changeLanguage('en')}
            className={`rounded px-3 py-1 text-sm ${
              i18n.language === 'en'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('hi')}
            className={`rounded px-3 py-1 text-sm ${
              i18n.language === 'hi'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            हिन्दी
          </button>
          <button
            onClick={() => changeLanguage('gu')}
            className={`rounded px-3 py-1 text-sm ${
              i18n.language === 'gu'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            ગુજરાતી
          </button>
        </div>

        {/* Auth content */}
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
