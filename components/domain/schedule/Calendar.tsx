'use client';

import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import type { EventClickArg, EventInput } from '@fullcalendar/core';
import CalendarContent from './CalendarContent';
import { statusMap, type ReservationStatus } from '@/constants/statusMap';

type CalendarStatus = Extract<ReservationStatus, 'pending' | 'confirmed' | 'completed'>;

export interface ScheduleItem {
  date: string;
  status: CalendarStatus;
  count: number;
}

interface CalendarProps {
  schedule: ScheduleItem[];
  onClickItem: (date: string, status: CalendarStatus) => void;
}

const calendarStatusColorMap: Record<CalendarStatus, string> = {
  pending: '#0085FF',
  confirmed: '#FFF4E8',
  completed: '#DDDDDD',
};

export function Calendar({ schedule, onClickItem }: CalendarProps) {
  const events: EventInput[] = schedule.map(item => ({
    title: `${statusMap[item.status].calendarText} ${item.count}`,
    date: item.date,
    color: calendarStatusColorMap[item.status],
    extendedProps: {
      status: item.status,
      count: item.count,
    },
  }));

  const handleEventClick = (arg: EventClickArg) => {
    const status = arg.event.extendedProps.status as CalendarStatus;
    const date = arg.event.startStr;

    onClickItem(date, status);
  };

  return (
    <FullCalendar
      height="auto"
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      locale="ko"
      events={events}
      eventContent={eventInfo => <CalendarContent eventInfo={eventInfo} />}
      eventClick={handleEventClick}
      headerToolbar={{ start: 'prev', center: 'title', end: 'next' }}
      fixedWeekCount={false}
    />
  );
}
