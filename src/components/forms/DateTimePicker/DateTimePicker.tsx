// Date and time picker component

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

interface DateTimePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  withTime?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = 'Pick a date',
  disabled = false,
  withTime = false,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(value ? format(value, 'HH:mm') : '00:00');

  const handleDateSelect = (date: Date | undefined) => {
    if (date && withTime) {
      const [hours, minutes] = time.split(':');
      date.setHours(parseInt(hours), parseInt(minutes));
    }
    onChange(date);
    if (!withTime) {
      setOpen(false);
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    if (value) {
      const [hours, minutes] = newTime.split(':');
      const newDate = new Date(value);
      newDate.setHours(parseInt(hours), parseInt(minutes));
      onChange(newDate);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            withTime ? (
              format(value, 'PPP HH:mm')
            ) : (
              format(value, 'PPP')
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={handleDateSelect} initialFocus />
        {withTime && (
          <div className="border-t p-3">
            <Input
              type="time"
              value={time}
              onChange={(e) => handleTimeChange(e.target.value)}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
