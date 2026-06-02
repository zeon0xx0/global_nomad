import { patchMyActivityReservations } from '@/services/myActivities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ReservationManageStatus } from './useReservations';

type ReservationMutationStatus = 'confirmed' | 'declined';

interface UseReservationMutationParams {
  activityId: number;
  scheduleId: number | null;
  status: ReservationManageStatus;
}

interface UpdateReservationParams {
  reservationId: number;
  status: ReservationMutationStatus;
}

const mutationErrorMessage: Record<ReservationMutationStatus, string> = {
  confirmed: '예약 승인에 실패했습니다.',
  declined: '예약 거절에 실패했습니다.',
};

export function useReservationMutation({ activityId, scheduleId, status }: UseReservationMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reservationId, status }: UpdateReservationParams) =>
      patchMyActivityReservations({
        activityId,
        reservationId,
        body: { status },
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['activityReservations', activityId, scheduleId, status],
      });

      queryClient.invalidateQueries({
        queryKey: ['reservationBoard', activityId],
      });
    },

    onError: (_error, variables) => {
      alert(mutationErrorMessage[variables.status]);
    },
  });
}
