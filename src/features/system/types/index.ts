// System admin types

// Industry types
export const IndustryStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
} as const;

export type IndustryStatus = (typeof IndustryStatus)[keyof typeof IndustryStatus];

export interface Industry {
  id: string;
  name: string;
  description: string;
  logo?: string;
  status: IndustryStatus;
  subscriptionPlan: string;
  subscriptionStatus: string;
  adminName: string;
  adminEmail: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  employeeCount: number;
  machineCount: number;
  createdAt: string;
  updatedAt: string;
  expiryDate?: string;
}

export interface IndustryFilters {
  search?: string;
  status?: IndustryStatus[];
  subscriptionPlan?: string[];
}

export interface IndustriesResponse {
  industries: Industry[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateIndustryInput {
  name: string;
  description: string;
  adminName: string;
  adminEmail: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  subscriptionPlan: string;
}

export interface UpdateIndustryInput extends Partial<CreateIndustryInput> {
  status?: IndustryStatus;
}

// Subscription types
export const SubscriptionPlan = {
  FREE: 'free',
  BASIC: 'basic',
  PROFESSIONAL: 'professional',
  ENTERPRISE: 'enterprise',
} as const;

export type SubscriptionPlan = (typeof SubscriptionPlan)[keyof typeof SubscriptionPlan];

export const SubscriptionStatus = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  TRIAL: 'trial',
  PAYMENT_PENDING: 'payment_pending',
} as const;

export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];

export interface Subscription {
  id: string;
  industryId: string;
  industryName: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  maxUsers: number;
  maxMachines: number;
  maxStorage: number; // in GB
  currentUsers: number;
  currentMachines: number;
  currentStorage: number; // in GB
  features: string[];
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  autoRenew: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionFilters {
  search?: string;
  status?: SubscriptionStatus[];
  plan?: SubscriptionPlan[];
}

export interface SubscriptionsResponse {
  subscriptions: Subscription[];
  total: number;
  page: number;
  pageSize: number;
}

// Platform Analytics types
export interface PlatformMetrics {
  totalIndustries: number;
  activeIndustries: number;
  totalUsers: number;
  totalMachines: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalStorage: number; // in GB
  totalOrders: number;
}

export interface SubscriptionDistribution {
  plan: SubscriptionPlan;
  count: number;
  percentage: number;
  revenue: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  subscriptions: number;
}

export interface IndustryGrowth {
  month: string;
  newIndustries: number;
  activeIndustries: number;
  churnedIndustries: number;
}

export interface TopIndustry {
  id: string;
  name: string;
  plan: SubscriptionPlan;
  users: number;
  machines: number;
  revenue: number;
}

export interface PlatformAnalytics {
  metrics: PlatformMetrics;
  subscriptionDistribution: SubscriptionDistribution[];
  revenueData: RevenueData[];
  industryGrowth: IndustryGrowth[];
  topIndustries: TopIndustry[];
}
