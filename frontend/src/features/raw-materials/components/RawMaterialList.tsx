// Raw Material List component

import { useTranslation } from 'react-i18next';
import { RawMaterialTable } from './RawMaterialTable';
import type { RawMaterial } from '../types';

interface RawMaterialListProps {
  materials: RawMaterial[];
}

export function RawMaterialList({ materials }: RawMaterialListProps) {
  const { t } = useTranslation(['rawMaterials', 'common']);

  if (materials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t('noMaterials')}</p>
      </div>
    );
  }

  return <RawMaterialTable materials={materials} />;
}
