// Raw Material Edit Page

import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRawMaterial, useUpdateRawMaterial } from '../hooks';
import { RawMaterialForm } from '../components';
import type { RawMaterialFormData } from '../types';

export default function RawMaterialEditPage() {
  const { t } = useTranslation('rawMaterials');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: material, isLoading, error } = useRawMaterial(id!);
  const updateMaterial = useUpdateRawMaterial();

  const handleSubmit = (data: RawMaterialFormData) => {
    updateMaterial.mutate(
      { id: id!, data },
      {
        onSuccess: () => {
          navigate(`/raw-materials/${id}`);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">{t('common:loadingState.loading')}</p>
      </div>
    );
  }

  if (error || !material) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-destructive">{t('messages.loadError')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/raw-materials/${id}`)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('editMaterial')}</h1>
          <p className="text-muted-foreground">{material.name}</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{t('updateMaterial')}</CardTitle>
          <CardDescription>{t('form.nameDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <RawMaterialForm
            initialData={material}
            onSubmit={handleSubmit}
            isSubmitting={updateMaterial.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
