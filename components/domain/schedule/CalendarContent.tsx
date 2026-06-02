import type { EventContentArg } from '@fullcalendar/core';
import { statusMap, type ReservationStatus } from '@/constants/statusMap';

type CalendarStatus = Extract<ReservationStatus, 'pending' | 'confirmed' | 'completed'>;

const calendarStatusStyleMap: Record<CalendarStatus, string> = {
  pending: 'text-white font-regular',
  confirmed: 'text-orange-500 font-regular',
  completed: 'text-gray-900 font-regular',
};

export default function CalendarContent({ eventInfo }: { eventInfo: EventContentArg }) {
  const status = eventInfo.event.extendedProps.status as CalendarStatus;
  const count = eventInfo.event.extendedProps.count as number;

  return (
    <div className={`w-full rounded px-1 py-[2px] text-xs font-semibold ${calendarStatusStyleMap[status]}`}>
      {statusMap[status].calendarText} {count}
    </div>
  );
}
