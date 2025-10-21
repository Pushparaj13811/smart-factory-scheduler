// Platform Analytics page

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { Building2, Users, Server, DollarSign } from 'lucide-react';
import { usePlatformAnalytics } from '../hooks';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function AnalyticsPage() {
  const { t } = useTranslation(['system', 'common']);
  const { data, isLoading, isError, refetch } = usePlatformAnalytics();

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState message={t('common:messages.loadError')} retry={refetch} />;
  if (!data) return null;

  const { metrics, subscriptionDistribution, revenueData, industryGrowth, topIndustries } = data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('analytics.title')}</h1>
        <p className="text-muted-foreground">{t('analytics.subtitle')}</p>
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('analytics.totalIndustries')}</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalIndustries}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.activeIndustries} {t('analytics.activeIndustries').toLowerCase()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('analytics.totalUsers')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('analytics.totalMachines')}</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalMachines}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('analytics.totalRevenue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              ${metrics.monthlyRevenue.toLocaleString()} {t('analytics.monthlyRevenue').toLowerCase()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Subscription Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.subscriptionDistribution')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionDistribution}
                  dataKey="count"
                  nameKey="plan"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.plan}: ${entry.count}`}
                >
                  {subscriptionDistribution.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.revenueChart')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name={t('analytics.revenue')} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Industry Growth */}
      <Card>
        <CardHeader>
          <CardTitle>{t('analytics.industryGrowth')}</CardTitle>
          <CardDescription>Monthly new and churned industries</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={industryGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="newIndustries" fill="#10b981" name={t('analytics.newIndustries')} />
              <Bar dataKey="churnedIndustries" fill="#ef4444" name={t('analytics.churnedIndustries')} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Industries */}
      <Card>
        <CardHeader>
          <CardTitle>{t('analytics.topIndustries')}</CardTitle>
          <CardDescription>Top 5 industries by revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topIndustries.map((industry, index) => (
              <div key={industry.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{industry.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {t(`subscriptions.plans.${industry.plan}`)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${industry.revenue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {industry.users} {t('analytics.users')} • {industry.machines} {t('analytics.machines')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
