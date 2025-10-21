// Raw Material types and interfaces

export const MaterialCategory = {
  METAL: 'metal',
  PLASTIC: 'plastic',
  CHEMICAL: 'chemical',
  WOOD: 'wood',
  RUBBER: 'rubber',
  TEXTILE: 'textile',
  COMPOSITE: 'composite',
  OTHER: 'other',
} as const;

export type MaterialCategory = (typeof MaterialCategory)[keyof typeof MaterialCategory];

export const MaterialStatus = {
  IN_STOCK: 'in_stock',
  LOW_STOCK: 'low_stock',
  OUT_OF_STOCK: 'out_of_stock',
  ORDERED: 'ordered',
} as const;

export type MaterialStatus = (typeof MaterialStatus)[keyof typeof MaterialStatus];

export interface RawMaterial {
  id: string;
  name: string;
  code: string;
  description: string;
  category: MaterialCategory;
  status: MaterialStatus;
  unit: string;
  quantity: number;
  reorderLevel: number;
  unitCost: number;
  supplier: string;
  supplierContact?: string;
  leadTimeDays?: number;
  storageLocation?: string;
  specifications?: Record<string, string | number>;
  lastRestocked?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialConsumption {
  id: string;
  materialId: string;
  quantity: number;
  consumedBy: string;
  consumedAt: string;
  purpose: string;
  notes?: string;
}

export interface RawMaterialFilters {
  search?: string;
  category?: MaterialCategory;
  status?: MaterialStatus;
  supplier?: string;
  minQuantity?: number;
  maxQuantity?: number;
}

export interface RawMaterialsResponse {
  rawMaterials: RawMaterial[];
  total: number;
  page: number;
  pageSize: number;
}

export interface RawMaterialFormData {
  name: string;
  code: string;
  description: string;
  category: MaterialCategory;
  unit: string;
  quantity: number;
  reorderLevel: number;
  unitCost: number;
  supplier: string;
  supplierContact?: string;
  leadTimeDays?: number;
  storageLocation?: string;
  specifications?: Record<string, string | number>;
}

export interface StockAdjustment {
  quantity: number;
  reason: string;
  adjustedBy?: string;
}

export interface ConsumptionRecord {
  quantity: number;
  purpose: string;
  consumedBy: string;
  notes?: string;
}
