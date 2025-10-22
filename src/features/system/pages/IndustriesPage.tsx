// Industries management page

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { Search, Building2, Users, Server, Ban, CheckCircle } from 'lucide-react';
import { useIndustries, useSuspendIndustry, useActivateIndustry } from '../hooks';
import { IndustryStatus } from '../types';
import type { Industry } from '../types';
import { formatDate } from 'date-fns';

export default function IndustriesPage() {
  const { t } = useTranslation(['system', 'common']);
  const [page] = useState(1);
  const [search, setSearch] = useState('');
  const { data, isLoading, isError, refetch } = useIndustries(page, 20);
  const suspendIndustry = useSuspendIndustry();
  const activateIndustry = useActivateIndustry();

  const getStatusColor = (status: string) => {
    switch (status) {
      case IndustryStatus.ACTIVE:
        return 'default';
      case IndustryStatus.SUSPENDED:
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const handleAction = (industry: Industry) => {
    if (industry.status === IndustryStatus.ACTIVE) {
      suspendIndustry.mutate(industry.id);
    } else {
      activateIndustry.mutate(industry.id);
    }
  };

  const filteredIndustries = data?.industries.filter(
    (ind) =>
      ind.name.toLowerCase().includes(search.toLowerCase()) ||
      ind.adminEmail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('industries.title')}</h1>
        <p className="text-muted-foreground">{t('industries.subtitle')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('industries.totalIndustries')}
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.total || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('industries.activeIndustries')}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.industries.filter((i) => i.status === IndustryStatus.ACTIVE).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('industries.suspendedIndustries')}
            </CardTitle>
            <Ban className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.industries.filter((i) => i.status === IndustryStatus.SUSPENDED).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('industries.title')}</CardTitle>
              <CardDescription>{data?.total} {t('common:pagination.totalItems')}</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('common:actions.search')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && <LoadingState />}
          {isError && <ErrorState message={t('common:messages.loadError')} retry={refetch} />}
          {!isLoading && !isError && filteredIndustries && (
            <div className="space-y-4">
              {filteredIndustries.map((industry) => (
                <Card key={industry.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{industry.name}</h3>
                          <Badge variant={getStatusColor(industry.status)}>
                            {t(`industries.status.${industry.status}`)}
                          </Badge>
                          <Badge variant="outline">{industry.subscriptionPlan}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{industry.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">{t('industries.adminName')}</p>
                            <p className="font-medium">{industry.adminName}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">{t('industries.adminEmail')}</p>
                            <p className="font-medium">{industry.adminEmail}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">{t('industries.employeeCount')}</p>
                              <p className="font-medium">{industry.employeeCount}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Server className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">{t('industries.machineCount')}</p>
                              <p className="font-medium">{industry.machineCount}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>
                            {t('industries.createdAt')}: {formatDate(industry.createdAt, 'PPP')}
                          </span>
                          {industry.expiryDate && (
                            <span>
                              {t('industries.expiryDate')}: {formatDate(industry.expiryDate, 'PPP')}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant={industry.status === IndustryStatus.ACTIVE ? 'destructive' : 'default'}
                        size="sm"
                        onClick={() => handleAction(industry)}
                        disabled={suspendIndustry.isPending || activateIndustry.isPending}
                      >
                        {industry.status === IndustryStatus.ACTIVE
                          ? t('industries.actions.suspend')
                          : t('industries.actions.activate')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredIndustries.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  {t('industries.noIndustries')}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
