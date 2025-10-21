// Orders page - Placeholder

import { PlaceholderPage } from '@/components/common/PlaceholderPage';
import { ShoppingCart } from 'lucide-react';

export default function OrdersPage() {
  return (
    <PlaceholderPage
      title="Orders Management"
      description="View and manage production orders and customer requests."
      icon={ShoppingCart}
    />
  );
}
