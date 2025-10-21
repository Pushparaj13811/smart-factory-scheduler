// Order types and interfaces

export const OrderStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  ON_HOLD: 'on_hold',
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const OrderPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

export type OrderPriority = (typeof OrderPriority)[keyof typeof OrderPriority];

export interface OrderItem {
  componentId: string;
  componentName?: string;
  componentCode?: string;
  quantity: number;
  unitPrice: number;
  totalPrice?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email?: string;
    phone?: string;
    company?: string;
  };
  items: OrderItem[];
  totalQuantity: number;
  totalAmount: number;
  status: OrderStatus;
  priority: OrderPriority;
  dueDate: string;
  startDate?: string;
  completedDate?: string;
  assignedMachineId?: string;
  assignedMachineName?: string;
  notes?: string;
  industryId: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderInput {
  orderNumber: string;
  customer: {
    name: string;
    email?: string;
    phone?: string;
    company?: string;
  };
  items: Omit<OrderItem, 'componentName' | 'componentCode' | 'totalPrice'>[];
  priority: OrderPriority;
  dueDate: string;
  notes?: string;
}

export interface UpdateOrderInput {
  orderNumber?: string;
  customer?: {
    name: string;
    email?: string;
    phone?: string;
    company?: string;
  };
  items?: Omit<OrderItem, 'componentName' | 'componentCode' | 'totalPrice'>[];
  status?: OrderStatus;
  priority?: OrderPriority;
  dueDate?: string;
  startDate?: string;
  completedDate?: string;
  assignedMachineId?: string;
  notes?: string;
}

export interface OrderFilters {
  status?: OrderStatus[];
  priority?: OrderPriority[];
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  pageSize: number;
}

export interface OrderStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  onHold: number;
  totalRevenue: number;
  averageOrderValue: number;
}

export interface OrderTimelineEvent {
  id: string;
  type: 'status_change' | 'assignment' | 'note' | 'created';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  metadata?: Record<string, unknown>;
}
