// System admin service layer

import { apiClient } from '@/lib/api-client';
import type {
  IndustriesResponse,
  Industry,
  CreateIndustryInput,
  UpdateIndustryInput,
  IndustryFilters,
  SubscriptionsResponse,
  Subscription,
  SubscriptionFilters,
  PlatformAnalytics,
} from '../types';

export const systemService = {
  // Industries
  async getIndustries(
    page = 1,
    pageSize = 10,
    filters?: IndustryFilters
  ): Promise<IndustriesResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (filters?.status) {
      filters.status.forEach((s) => params.append('status', s));
    }
    if (filters?.subscriptionPlan) {
      filters.subscriptionPlan.forEach((p) => params.append('subscriptionPlan', p));
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }

    const response = await apiClient.get<IndustriesResponse>(
      `/system/industries?${params.toString()}`
    );
    return response.data;
  },

  async getIndustry(id: string): Promise<Industry> {
    const response = await apiClient.get<Industry>(`/system/industries/${id}`);
    return response.data;
  },

  async createIndustry(data: CreateIndustryInput): Promise<Industry> {
    const response = await apiClient.post<Industry>('/system/industries', data);
    return response.data;
  },

  async updateIndustry(id: string, data: UpdateIndustryInput): Promise<Industry> {
    const response = await apiClient.put<Industry>(`/system/industries/${id}`, data);
    return response.data;
  },

  async deleteIndustry(id: string): Promise<void> {
    await apiClient.delete(`/system/industries/${id}`);
  },

  async suspendIndustry(id: string): Promise<Industry> {
    const response = await apiClient.post<Industry>(`/system/industries/${id}/suspend`);
    return response.data;
  },

  async activateIndustry(id: string): Promise<Industry> {
    const response = await apiClient.post<Industry>(`/system/industries/${id}/activate`);
    return response.data;
  },

  // Subscriptions
  async getSubscriptions(
    page = 1,
    pageSize = 10,
    filters?: SubscriptionFilters
  ): Promise<SubscriptionsResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (filters?.status) {
      filters.status.forEach((s) => params.append('status', s));
    }
    if (filters?.plan) {
      filters.plan.forEach((p) => params.append('plan', p));
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }

    const response = await apiClient.get<SubscriptionsResponse>(
      `/system/subscriptions?${params.toString()}`
    );
    return response.data;
  },

  async getSubscription(id: string): Promise<Subscription> {
    const response = await apiClient.get<Subscription>(`/system/subscriptions/${id}`);
    return response.data;
  },

  async renewSubscription(id: string): Promise<Subscription> {
    const response = await apiClient.post<Subscription>(`/system/subscriptions/${id}/renew`);
    return response.data;
  },

  async cancelSubscription(id: string): Promise<Subscription> {
    const response = await apiClient.post<Subscription>(`/system/subscriptions/${id}/cancel`);
    return response.data;
  },

  // Platform Analytics
  async getPlatformAnalytics(): Promise<PlatformAnalytics> {
    const response = await apiClient.get<PlatformAnalytics>('/system/analytics');
    return response.data;
  },
};
