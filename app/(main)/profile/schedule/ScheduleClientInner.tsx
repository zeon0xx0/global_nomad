'use client';

import ScheduleName from '@/components/domain/schedule/ScheduleName';
import { getMyActivities } from '@/services/myActivities';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import MyReservationCalendar from './calendar/MyReservationCalendar';
import EmptyState from '@/components/empty/EmptyState';
import SkeletonCalendar from '@/components/skeleton/SkeletonCalendar';

export default function ScheduleClientInner() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: () => getMyActivities({ size: 1000 }),
  });

  const activityList = useMemo(() => activities?.activities ?? [], [activities]);

  useEffect(() => {
    if (selectedId === null && activityList.length > 0) {
      setSelectedId(activityList[0].id);
    }
  }, [activityList, selectedId]);

  return (
    <div className="mb-6 ml-4">
      <div className="flex items-center justify-between mb-4 max-w-full md:max-w-[600px] lg:max-w-[792px]">
        <h1 className="text-3xl-bold">예약 현황</h1>
      </div>

      {isLoading ? (
        <SkeletonCalendar />
      ) : activityList.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <ScheduleName activityList={activityList} selectedId={selectedId ?? -1} onSelectedId={setSelectedId} />
          {selectedId !== null && <MyReservationCalendar activityId={selectedId} />}
        </>
      )}
    </div>
  );
}
