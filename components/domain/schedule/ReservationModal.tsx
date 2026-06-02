// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
// import TimeSelect from './TimeSelect';
// import { ReservationList } from './ReservationList';
// import { useReservedSchedules } from '@/hooks/useReservedSchedules';
// import { useReservations } from '@/hooks/useReservations';
// import { useReservationMutation } from '@/hooks/useReservationMutation';
// import { reservationManageStatusOptions, statusMap, type ReservationManageStatus } from '@/constants/statusMap';
// import { formatDateTime } from '@/constants/utils/reservationDate';
// import ComponentSpinner from '@/components/common/spinners/ComponentSpinner';
// import { ModalHeader } from './ModalHeader';
// import { useModalStore } from '@/store/modalStore';

// interface ReservationModalProps {
//   activityId: number;
//   selectedDate: string;
//   initialStatus: ReservationManageStatus;
// }

// export function ReservationModal({ activityId, selectedDate, initialStatus }: ReservationModalProps) {
//   const [status, setStatus] = useState<ReservationManageStatus>(initialStatus);
//   const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);

//   const { closeModal } = useModalStore();

//   const { data: schedules = [], isLoading: isSchedulesLoading } = useReservedSchedules(activityId, selectedDate);

//   useEffect(() => {
//     if (schedules.length > 0 && selectedScheduleId === null) {
//       setSelectedScheduleId(schedules[0].scheduleId);
//     }
//   }, [schedules, selectedScheduleId]);

//   const selectedSchedule = useMemo(
//     () => schedules.find(schedule => schedule.scheduleId === selectedScheduleId),
//     [schedules, selectedScheduleId],
//   );

//   const getStatusCount = (tabStatus: ReservationManageStatus) => {
//     return selectedSchedule?.count?.[tabStatus] ?? 0;
//   };

//   const {
//     data: reservationData,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading: isReservationsLoading,
//   } = useReservations({
//     activityId,
//     scheduleId: selectedScheduleId,
//     status,
//   });

//   const reservations = reservationData?.pages.flatMap(page => page.reservations) ?? [];

//   const updateReservationMutation = useReservationMutation({
//     activityId,
//     scheduleId: selectedScheduleId,
//     status,
//   });

//   const observerRef = useInfiniteScroll({
//     hasNextPage: !!hasNextPage,
//     isFetchingNextPage,
//     fetchNextPage,
//   });

//   return (
//     <div
//       className="
//         flex flex-col bg-white
//         w-[380px] min-h-[500px] max-h-[80vh] rounded-xl p-5
//         max-lg:w-full max-lg:h-full max-lg:max-h-none max-lg:min-h-0
//         max-sm:fixed max-sm:inset-0 max-sm:rounded-none
//       "
//     >
//       <ModalHeader title="예약 정보" onClose={closeModal} />

//       <div className="mb-6 flex gap-4 border-b border-gray-200 text-sm font-semibold">
//         {reservationManageStatusOptions.map(tabStatus => (
//           <button
//             key={tabStatus}
//             className={`
//               pb-3
//               ${status === tabStatus ? 'border-b-2 border-black text-black' : 'text-gray-400'}
//             `}
//             onClick={() => setStatus(tabStatus)}
//           >
//             {statusMap[tabStatus].shortText} <span>{getStatusCount(tabStatus)}</span>
//           </button>
//         ))}
//       </div>

//       <section className="mb-5">
//         <h2 className="mb-3 text-xl-semibold">예약 날짜</h2>

//         <p className="mb-2 ml-1 text-base font-medium text-gray-900">{formatDateTime(selectedDate)}</p>

//         {isSchedulesLoading ? (
//           <p className="mt-4 mb-6 text-sm text-gray-500">예약 시간 정보를 불러오는 중입니다.</p>
//         ) : (
//           <TimeSelect
//             schedules={schedules}
//             selectedScheduleId={selectedScheduleId}
//             onSelectSchedule={setSelectedScheduleId}
//           />
//         )}
//       </section>

//       <h2 className="mb-3 text-xl-semibold">예약 내역</h2>

//       <div className="flex-1 overflow-y-auto pr-1">
//         {isReservationsLoading ? (
//           <p className="py-4 text-center text-gray-400">예약 목록을 불러오는 중입니다.</p>
//         ) : (
//           <>
//             <ReservationList
//               reservations={reservations}
//               currentStatus={status}
//               onApprove={reservationId =>
//                 updateReservationMutation.mutate({
//                   reservationId,
//                   status: 'confirmed',
//                 })
//               }
//               onDecline={reservationId =>
//                 updateReservationMutation.mutate({
//                   reservationId,
//                   status: 'declined',
//                 })
//               }
//               isUpdating={updateReservationMutation.isPending}
//             />

//             {isFetchingNextPage && (
//               <div className="my-4">
//                 <ComponentSpinner spinnerSize={30} message="데이터를 불러오는 중입니다..." />
//               </div>
//             )}

//             <div ref={observerRef} className="h-1" />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import TimeSelect from './TimeSelect';
import { ReservationList } from './ReservationList';
import { useReservedSchedules } from '@/hooks/useReservedSchedules';
import { useReservations } from '@/hooks/useReservations';
import { useReservationMutation } from '@/hooks/useReservationMutation';
import { reservationManageStatusOptions, statusMap, type ReservationManageStatus } from '@/constants/statusMap';
import { formatDateTime } from '@/constants/utils/reservationDate';
import ComponentSpinner from '@/components/common/spinners/ComponentSpinner';
import { ModalHeader } from './ModalHeader';
import { useModalStore } from '@/store/modalStore';

interface ReservationModalProps {
  activityId: number;
  selectedDate: string;
  initialStatus: ReservationManageStatus;
}

export function ReservationModal({ activityId, selectedDate, initialStatus }: ReservationModalProps) {
  const [status, setStatus] = useState<ReservationManageStatus>(initialStatus);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);

  const { closeModal } = useModalStore();

  const { data: schedules = [], isLoading: isSchedulesLoading } = useReservedSchedules(activityId, selectedDate);

  useEffect(() => {
    if (schedules.length > 0 && selectedScheduleId === null) {
      setSelectedScheduleId(schedules[0].scheduleId);
    }
  }, [schedules, selectedScheduleId]);

  const selectedSchedule = useMemo(
    () => schedules.find(schedule => schedule.scheduleId === selectedScheduleId),
    [schedules, selectedScheduleId],
  );

  const getStatusCount = (tabStatus: ReservationManageStatus) => {
    return selectedSchedule?.count?.[tabStatus] ?? 0;
  };

  const {
    data: reservationData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isReservationsLoading,
  } = useReservations({
    activityId,
    scheduleId: selectedScheduleId,
    status,
  });

  const reservations = reservationData?.pages.flatMap(page => page.reservations) ?? [];

  const updateReservationMutation = useReservationMutation({
    activityId,
    scheduleId: selectedScheduleId,
    status,
  });

  const observerRef = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <div
      className="
    flex flex-col bg-white
    w-[430px] h-[560px] max-h-[82vh] rounded-xl p-5

    max-lg:w-full

    max-md:fixed
    max-md:inset-0
    max-md:w-full
    max-md:h-full
    max-md:max-h-none
    max-md:rounded-none
  "
    >
      <ModalHeader title="예약 정보" onClose={closeModal} />

      <div className="mb-6 flex gap-4 border-b border-gray-200 text-sm font-semibold">
        {reservationManageStatusOptions.map(tabStatus => (
          <button
            key={tabStatus}
            className={`
              pb-3
              ${status === tabStatus ? 'border-b-2 border-black text-black' : 'text-gray-400'}
            `}
            onClick={() => setStatus(tabStatus)}
          >
            {statusMap[tabStatus].shortText} <span>{getStatusCount(tabStatus)}</span>
          </button>
        ))}
      </div>

      <section className="mb-5">
        <h2 className="mb-3 text-xl-semibold">예약 날짜</h2>

        <p className="mb-2 ml-1 text-base font-medium text-gray-900">{formatDateTime(selectedDate)}</p>

        {isSchedulesLoading ? (
          <p className="mt-4 mb-6 text-sm text-gray-500">예약 시간 정보를 불러오는 중입니다.</p>
        ) : (
          <TimeSelect
            schedules={schedules}
            selectedScheduleId={selectedScheduleId}
            onSelectSchedule={setSelectedScheduleId}
          />
        )}
      </section>

      <h2 className="mb-3 text-xl-semibold">예약 내역</h2>

      <div className="flex-1 overflow-y-auto pr-1">
        {isReservationsLoading ? (
          <p className="py-4 text-center text-gray-400">예약 목록을 불러오는 중입니다.</p>
        ) : (
          <>
            <ReservationList
              reservations={reservations}
              currentStatus={status}
              onApprove={reservationId =>
                updateReservationMutation.mutate({
                  reservationId,
                  status: 'confirmed',
                })
              }
              onDecline={reservationId =>
                updateReservationMutation.mutate({
                  reservationId,
                  status: 'declined',
                })
              }
              isUpdating={updateReservationMutation.isPending}
            />

            {isFetchingNextPage && (
              <div className="my-4">
                <ComponentSpinner spinnerSize={30} message="데이터를 불러오는 중입니다..." />
              </div>
            )}

            <div ref={observerRef} className="h-1" />
          </>
        )}
      </div>
    </div>
  );
}
