// Raw Material List component

import { useTranslation } from 'react-i18next';
import { RawMaterialCard } from './RawMaterialCard';
import type { RawMaterial } from '../types';

interface RawMaterialListProps {
  materials: RawMaterial[];
}

export function RawMaterialList({ materials }: RawMaterialListProps) {
  const { t } = useTranslation('rawMaterials');

  if (materials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t('noMaterials')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {materials.map((material) => (
        <RawMaterialCard key={material.id} material={material} />
      ))}
    </div>
  );
}
