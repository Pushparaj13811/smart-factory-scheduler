// Production Schedule page

import { PlaceholderPage } from '@/components/common/PlaceholderPage';
import { Calendar } from 'lucide-react';

export default function SchedulePage() {
  return (
    <PlaceholderPage
      title="Production Schedule"
      description="View and manage production schedules, assign tasks to machines, and optimize workflow."
      icon={Calendar}
    />
  );
}
