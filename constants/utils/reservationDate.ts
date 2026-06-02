import { format } from 'date-fns';

export function formatDate(date: string) {
  return format(new Date(date), 'yyyy.MM.dd');
}

export function formatDateTime(dateTime: string) {
  return format(new Date(dateTime), 'yyyy년 M월 d일');
}

export function formatTimeRange(startTime: string, endTime: string) {
  return `${startTime} - ${endTime}`;
}

export function getYearMonth(date = new Date()) {
  return {
    year: format(date, 'yyyy'),
    month: format(date, 'MM'),
  };
}
