// Maintenance Calendar component

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { MaintenanceCalendarEvent } from '../types';
import { MaintenanceStatus } from '../types';
import { format, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

interface MaintenanceCalendarProps {
  events: MaintenanceCalendarEvent[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

export function MaintenanceCalendar({ events, selectedDate, onDateSelect: _onDateSelect }: MaintenanceCalendarProps) {
  const { t } = useTranslation(['maintenance', 'common']);

  const getStatusVariant = (status: MaintenanceStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case MaintenanceStatus.COMPLETED:
        return 'default';
      case MaintenanceStatus.IN_PROGRESS:
        return 'secondary';
      case MaintenanceStatus.OVERDUE:
        return 'destructive';
      case MaintenanceStatus.CANCELLED:
        return 'outline';
      case MaintenanceStatus.SCHEDULED:
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const filteredEvents = selectedDate
    ? events.filter((event) => isSameDay(new Date(event.date), selectedDate))
    : events;

  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {t('calendar.title')}
          </CardTitle>
          {selectedDate && (
            <span className="text-sm text-muted-foreground">
              {format(selectedDate, 'MMMM dd, yyyy')}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {sortedEvents.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            {t('calendar.noEvents')}
          </div>
        ) : (
          <div className="space-y-3">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{event.title}</p>
                    <Badge variant={getStatusVariant(event.status)} className="text-xs">
                      {t(`status.${event.status}`)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {event.machineName} • {format(new Date(event.date), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
