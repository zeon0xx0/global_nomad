import type { GetMyActivityReservationsSuccessResponse } from '@/types/domain/myActivities/types';
import type { ReservationManageStatus } from '@/hooks/useReservations';
import { statusMap } from '@/constants/statusMap';

type ReservationItem = GetMyActivityReservationsSuccessResponse['reservations'][number];

interface ReservationListProps {
  reservations: ReservationItem[];
  currentStatus: ReservationManageStatus;
  onApprove: (reservationId: number) => void;
  onDecline: (reservationId: number) => void;
  isUpdating: boolean;
}

function isManageReservation(
  reservation: ReservationItem,
): reservation is ReservationItem & { status: ReservationManageStatus } {
  return reservation.status !== 'canceled';
}

export function ReservationList({
  reservations,
  currentStatus,
  onApprove,
  onDecline,
  isUpdating,
}: ReservationListProps) {
  const manageReservations = reservations.filter(isManageReservation);

  if (manageReservations.length === 0) {
    return <p className="text-gray-400 text-center py-4">예약 내역이 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {manageReservations.map(reservation => (
        <div key={reservation.id} className="border rounded-md mb-2 px-4 py-3">
          <p className="mb-1">
            <span className="text-gray-800 text-lg-semibold">닉네임 </span>
            <span className="text-lg-medium"> {reservation.nickname}</span>
          </p>

          <p className="mb-1">
            <span className="text-gray-800 text-lg-semibold">인원 </span>
            <span className="text-lg-medium"> {reservation.headCount}명</span>
          </p>

          {currentStatus === 'pending' ? (
            <div className="flex gap-2 justify-end mt-2">
              <button
                type="button"
                className="px-3 py-1 rounded-md bg-green-600 text-white disabled:opacity-50"
                disabled={isUpdating}
                onClick={() => onApprove(reservation.id)}
              >
                승인하기
              </button>

              <button
                type="button"
                className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
                disabled={isUpdating}
                onClick={() => onDecline(reservation.id)}
              >
                거절하기
              </button>
            </div>
          ) : (
            <div className="flex justify-end mt-2">
              <span
                className={`px-3 py-[2px] font-semibold text-sm rounded-full ${
                  currentStatus === 'confirmed' ? 'bg-orange-100 text-orange-500' : 'bg-red-100 text-red-500'
                }`}
              >
                {statusMap[currentStatus].shortText}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
