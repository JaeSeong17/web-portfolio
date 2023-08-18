'use client';

import { format, isSameDay } from 'date-fns';
import { FC, useCallback } from 'react';
import { Calendar } from 'react-date-range';

interface CalendarPlannerProps {
  selectedDate: Date;
  markedDate: Date[];
  onChange: (value: Date) => void;
  startDate?: Date;
  endDate?: Date;
}

const CalendarPlanner: FC<CalendarPlannerProps> = ({
  selectedDate,
  markedDate,
  onChange,
  startDate,
  endDate,
}) => {
  const dateMarker = useCallback(
    (day: Date) => {
      let extraDot = null;
      if (markedDate.find((written) => isSameDay(day, written))) {
        extraDot = (
          <div className='w-3 h-3 rounded-full bg-green-500 absolute top-2 right-2' />
        );
      }
      return (
        <div>
          {extraDot}
          <span>{format(day, 'd')}</span>
        </div>
      );
    },
    [markedDate]
  );

  return (
    <Calendar
      date={selectedDate}
      onChange={onChange}
      minDate={startDate}
      maxDate={endDate}
      color={'#DC2626'}
      dayContentRenderer={dateMarker}
    />
  );
};

export default CalendarPlanner;
