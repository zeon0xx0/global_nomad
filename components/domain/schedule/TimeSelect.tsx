'use client';

import Image from 'next/image';
import DropdownSelect from '@/components/common/DropDownSelect';
import { formatTimeRange } from '@/constants/utils/reservationDate';
import ArrowDownIcon from '@/public/ic_arrow.svg';

interface ReservedSchedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    pending: number;
    confirmed: number;
    declined: number;
  };
}

interface TimeSelectProps {
  schedules: ReservedSchedule[];
  selectedScheduleId: number | null;
  onSelectSchedule: (scheduleId: number) => void;
}

export default function TimeSelect({ schedules, selectedScheduleId, onSelectSchedule }: TimeSelectProps) {
  if (schedules.length === 0) {
    return <p className="mb-6 mt-1 text-sm text-gray-500">예약된 시간이 없습니다.</p>;
  }

  const options = schedules.map(schedule => formatTimeRange(schedule.startTime, schedule.endTime));

  const selectedSchedule = schedules.find(schedule => schedule.scheduleId === selectedScheduleId);

  const selectedLabel = selectedSchedule ? formatTimeRange(selectedSchedule.startTime, selectedSchedule.endTime) : '';

  const handleSelect = (label: string) => {
    const selected = schedules.find(schedule => formatTimeRange(schedule.startTime, schedule.endTime) === label);

    if (selected) {
      onSelectSchedule(selected.scheduleId);
    }
  };

  return (
    <div className="mb-6 mt-1 w-full">
      <DropdownSelect
        type="list"
        options={options}
        selected={selectedLabel}
        onSelect={handleSelect}
        placeholder="예약 시간을 선택해주세요"
        icon={<Image src={ArrowDownIcon} alt="" width={12} height={20} />}
      />
    </div>
  );
}
