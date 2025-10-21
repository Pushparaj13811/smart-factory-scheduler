// Entity types for the application

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Industry extends BaseEntity {
  name: string;
  status: 'active' | 'inactive' | 'suspended';
  subscriptionId?: string;
}

export interface Machine extends BaseEntity {
  category: string;
  name: string;
  code: string;
  status: 'active' | 'inactive' | 'maintenance';
  remarks?: string;
  industryId: string;
}

export interface Component extends BaseEntity {
  name: string;
  category: string;
  code: string;
  industryId: string;
}

export interface RawMaterial extends BaseEntity {
  type: string;
  name: string;
  specification: string;
  availableQuantity: number;
  unit: string;
  minStockLevel?: number;
  remarks?: string;
  industryId: string;
}

export interface Order extends BaseEntity {
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  deadline: Date;
  progress: number;
  industryId: string;
}

export type Status = 'active' | 'inactive' | 'maintenance' | 'pending' | 'completed' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
