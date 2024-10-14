'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { BASE_URL } from '@/constants/data';
import { cn } from '@/lib/utils';
import { CalendarIcon, UpdateIcon } from '@radix-ui/react-icons';
import { addDays, format, previousDay } from 'date-fns';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

export function CalendarDateRangePicker({
  className // onDataChange
}: {
  className?: string;
}) {
  const router = useRouter();
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const handleFetch = async () => {
    if (date?.from && date?.to) {
      const startDate = date.from;
      const endDate = date.to;
      router.refresh();
      router.push(`/dashboard?startDate=${startDate}&endDate=${endDate}`);
      router.refresh();
    }
  };

  return (
    <div className={cn('flex ', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[260px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button onClick={handleFetch} disabled={!date?.from || !date?.to}>
        <UpdateIcon />
      </Button>
    </div>
  );
}
