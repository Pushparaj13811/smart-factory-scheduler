// Raw Material Create Page

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useCreateRawMaterial } from '../hooks';
import { RawMaterialForm } from '../components';
import type { RawMaterialFormData } from '../types';

export default function RawMaterialCreatePage() {
  const { t } = useTranslation('rawMaterials');
  const navigate = useNavigate();
  const createMaterial = useCreateRawMaterial();

  const handleSubmit = (data: RawMaterialFormData) => {
    createMaterial.mutate(data, {
      onSuccess: () => {
        navigate('/raw-materials');
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/raw-materials')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('createMaterial')}</h1>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{t('form.name')}</CardTitle>
          <CardDescription>{t('form.nameDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <RawMaterialForm onSubmit={handleSubmit} isSubmitting={createMaterial.isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
