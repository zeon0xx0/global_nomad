import { getMyReservedSchedule } from '@/services/myActivities';
import { useQuery } from '@tanstack/react-query';

export function useReservedSchedules(activityId: number, selectedDate: string) {
  return useQuery({
    queryKey: ['reservedSchedules', activityId, selectedDate],
    queryFn: () =>
      getMyReservedSchedule({
        activityId,
        date: selectedDate,
      }),
    enabled: !!activityId && !!selectedDate,
  });
}
