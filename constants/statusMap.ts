export type ReservationManageStatus = 'pending' | 'confirmed' | 'declined';

export type ReservationStatus = ReservationManageStatus | 'canceled' | 'completed';

export const statusMap: Record<
  ReservationStatus,
  {
    calendarText: string;
    filterText: string;
    shortText: string;
  }
> = {
  pending: {
    calendarText: '예약',
    filterText: '예약 신청',
    shortText: '신청',
  },
  confirmed: {
    calendarText: '승인',
    filterText: '예약 승인',
    shortText: '승인',
  },
  declined: {
    calendarText: '거절',
    filterText: '예약 거절',
    shortText: '거절',
  },
  canceled: {
    calendarText: '취소',
    filterText: '예약 취소',
    shortText: '취소',
  },
  completed: {
    calendarText: '완료',
    filterText: '예약 완료',
    shortText: '완료',
  },
};

export const reservationManageStatusOptions: ReservationManageStatus[] = ['pending', 'confirmed', 'declined'];
