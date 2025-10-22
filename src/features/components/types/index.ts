// Component types

export const ComponentCategory = {
  MECHANICAL: 'mechanical',
  ELECTRONIC: 'electronic',
  ASSEMBLY: 'assembly',
  CUSTOM: 'custom',
} as const;

export type ComponentCategory = (typeof ComponentCategory)[keyof typeof ComponentCategory];

export const ComponentStatus = {
  IN_STOCK: 'in_stock',
  LOW_STOCK: 'low_stock',
  OUT_OF_STOCK: 'out_of_stock',
  DISCONTINUED: 'discontinued',
} as const;

export type ComponentStatus = (typeof ComponentStatus)[keyof typeof ComponentStatus];

export interface Component {
  id: string;
  name: string;
  code: string;
  description: string;
  category: ComponentCategory;
  status: ComponentStatus;
  unit: string;
  quantityInStock: number;
  reorderLevel: number;
  unitPrice: number;
  supplier?: string;
  leadTimeDays?: number;
  specifications?: Record<string, string>;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ComponentFilters {
  search?: string;
  category?: ComponentCategory;
  status?: ComponentStatus;
  minQuantity?: number;
  maxQuantity?: number;
}

export interface ComponentsResponse {
  components: Component[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ComponentFormData {
  name: string;
  code: string;
  description: string;
  category: ComponentCategory;
  status: ComponentStatus;
  unit: string;
  quantityInStock: number;
  reorderLevel: number;
  unitPrice: number;
  supplier?: string;
  leadTimeDays?: number;
  specifications?: Record<string, string>;
}
