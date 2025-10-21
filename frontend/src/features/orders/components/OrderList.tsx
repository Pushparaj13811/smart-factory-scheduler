// Order List component

import { OrderCard } from './OrderCard';
import type { Order } from '../types';

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
