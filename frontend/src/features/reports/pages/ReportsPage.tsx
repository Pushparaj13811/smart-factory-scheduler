// Reports and Analytics page

import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  LineChart,
  FileText,
  Download,
  TrendingUp,
  Package,
  Wrench,
  CalendarDays,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

export default function ReportsPage() {
  const { t } = useTranslation(['reports', 'common']);

  const handleExport = (type: string) => {
    console.log(`Exporting ${type} report...`);
    // TODO: Implement export functionality
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        actions={
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            {t('actions.exportAll')}
          </Button>
        }
      />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t('tabs.overview')}</TabsTrigger>
          <TabsTrigger value="production">{t('tabs.production')}</TabsTrigger>
          <TabsTrigger value="maintenance">{t('tabs.maintenance')}</TabsTrigger>
          <TabsTrigger value="inventory">{t('tabs.inventory')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('metrics.totalProduction')}</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">
                  +12.5% {t('common:time.fromLastMonth')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('metrics.activeOrders')}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">
                  8 {t('metrics.urgent')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('metrics.maintenanceDue')}</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">
                  3 {t('metrics.overdue')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('metrics.inventoryStatus')}</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">
                  {t('metrics.inStock')}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('charts.productionTrends')}</CardTitle>
                <CardDescription>{t('charts.last30Days')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  <BarChart className="h-12 w-12 mr-2" />
                  <span>{t('charts.chartPlaceholder')}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('charts.orderCompletion')}</CardTitle>
                <CardDescription>{t('charts.last30Days')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  <LineChart className="h-12 w-12 mr-2" />
                  <span>{t('charts.chartPlaceholder')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="production" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('production.title')}</CardTitle>
              <CardDescription>{t('production.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">{t('production.completedTasks')}</p>
                    <p className="text-sm text-muted-foreground">{t('production.thisWeek')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">127</p>
                  <Button variant="link" size="sm" onClick={() => handleExport('production')}>
                    <Download className="mr-1 h-3 w-3" />
                    {t('common:actions.export')}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium">{t('production.delayedTasks')}</p>
                    <p className="text-sm text-muted-foreground">{t('production.currentlyActive')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">12</p>
                  <Button variant="link" size="sm" onClick={() => handleExport('delays')}>
                    <Download className="mr-1 h-3 w-3" />
                    {t('common:actions.export')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('maintenance.title')}</CardTitle>
              <CardDescription>{t('maintenance.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{t('maintenance.scheduled')}</p>
                    <p className="text-sm text-muted-foreground">{t('maintenance.nextMonth')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">18</p>
                  <Button variant="link" size="sm" onClick={() => handleExport('maintenance-schedule')}>
                    <Download className="mr-1 h-3 w-3" />
                    {t('common:actions.export')}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">{t('maintenance.completed')}</p>
                    <p className="text-sm text-muted-foreground">{t('maintenance.lastMonth')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">24</p>
                  <Button variant="link" size="sm" onClick={() => handleExport('maintenance-history')}>
                    <Download className="mr-1 h-3 w-3" />
                    {t('common:actions.export')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('inventory.title')}</CardTitle>
              <CardDescription>{t('inventory.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{t('inventory.totalItems')}</p>
                    <p className="text-sm text-muted-foreground">{t('inventory.acrossAllCategories')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">342</p>
                  <Button variant="link" size="sm" onClick={() => handleExport('inventory')}>
                    <Download className="mr-1 h-3 w-3" />
                    {t('common:actions.export')}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium">{t('inventory.lowStock')}</p>
                    <p className="text-sm text-muted-foreground">{t('inventory.needsReorder')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">23</p>
                  <Button variant="link" size="sm" onClick={() => handleExport('low-stock')}>
                    <Download className="mr-1 h-3 w-3" />
                    {t('common:actions.export')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
