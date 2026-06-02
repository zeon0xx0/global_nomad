import { getMyActivityReservations } from '@/services/myActivities';
import { useInfiniteQuery } from '@tanstack/react-query';

export type ReservationManageStatus = 'pending' | 'confirmed' | 'declined';

interface UseReservationsParams {
  activityId: number;
  scheduleId: number | null;
  status: ReservationManageStatus;
}

export function useReservations({ activityId, scheduleId, status }: UseReservationsParams) {
  return useInfiniteQuery({
    queryKey: ['activityReservations', activityId, scheduleId, status],
    queryFn: ({ pageParam = undefined }) =>
      getMyActivityReservations({
        activityId,
        scheduleId: scheduleId!,
        status,
        cursorId: pageParam as number | undefined,
        size: 10,
      }),
    getNextPageParam: lastPage => lastPage.cursorId ?? undefined,
    initialPageParam: undefined as number | undefined,
    enabled: !!activityId && !!scheduleId,
    retry: false,
  });
}
