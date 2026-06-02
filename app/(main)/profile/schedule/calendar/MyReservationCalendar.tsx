'use client';

import { Calendar, ScheduleItem } from '@/components/domain/schedule/Calendar';
import { ReservationModal } from '@/components/domain/schedule/ReservationModal';
//import { type ReservationManageStatus, type ReservationStatus } from '@/constants/statusMap';
import { getMyReservationBoard } from '@/services/myActivities';
import { useModalStore } from '@/store/modalStore';
import { useReservationStore } from '@/store/useReservationStore';
import { getYearMonth } from '@/constants/utils/reservationDate';
import { useQuery } from '@tanstack/react-query';

// type CalendarStatus = Extract<ReservationStatus, 'pending' | 'confirmed' | 'completed'>;

// const tabMap: Record<CalendarStatus, ReservationManageStatus | null> = {
//   pending: 'pending',
//   confirmed: 'confirmed',
//   completed: null,
// };

export default function MyReservationCalendar({ activityId }: { activityId: number }) {
  const { openModal } = useModalStore();
  const { setStatusTab } = useReservationStore();

  const { year, month } = getYearMonth();

  const { data } = useQuery({
    queryKey: ['reservationBoard', activityId, year, month],
    queryFn: () => getMyReservationBoard({ activityId, year, month }),
    enabled: !!activityId,
  });

  console.log('예약 현황 캘린더 data:', data);

  const scheduleData: ScheduleItem[] =
    data?.flatMap(item => [
      {
        date: item.date,
        status: 'pending',
        count: item.reservations.pending,
      },
      {
        date: item.date,
        status: 'confirmed',
        count: item.reservations.confirmed,
      },
      {
        date: item.date,
        status: 'completed',
        count: item.reservations.completed,
      },
    ]) ?? [];

  //   return (
  //     <Calendar
  //       schedule={scheduleData}
  //       onClickItem={(date, status) => {
  //         const reservationStatus = tabMap[status];

  //         if (!reservationStatus) return;

  //         setStatusTab(reservationStatus);

  //         openModal(ReservationModal, {
  //           activityId,
  //           selectedDate: date,
  //           initialStatus: reservationStatus,
  //         });
  //       }}
  //     />
  //   );
  // }

  return (
    <Calendar
      schedule={scheduleData}
      onClickItem={date => {
        setStatusTab('pending');

        openModal(ReservationModal, {
          activityId,
          selectedDate: date,
          initialStatus: 'pending',
        });
      }}
    />
  );
}
