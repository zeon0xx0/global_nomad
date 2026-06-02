import { statusMap, type ReservationStatus } from './statusMap';

export const filterOptions: { value: '' | ReservationStatus; label: string }[] = [
  { value: '', label: '전체' },
  { value: 'pending', label: statusMap.pending.filterText },
  { value: 'canceled', label: statusMap.canceled.filterText },
  { value: 'confirmed', label: statusMap.confirmed.filterText },
  { value: 'declined', label: statusMap.declined.filterText },
  { value: 'completed', label: statusMap.completed.filterText },
];

export const CATEGORIES = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

export const SORT_OPTIONS_DICT = {
  '가격 높은순': 'price_desc',
  '가격 낮은순': 'price_asc',
  최신순: 'latest',
  '리뷰 많은순': 'most_reviewed',
};

export type SortOptionKey = keyof typeof SORT_OPTIONS_DICT;
export type SortOptionValue = (typeof SORT_OPTIONS_DICT)[SortOptionKey];
export const SORT_OPTIONS_KEYS = Object.keys(SORT_OPTIONS_DICT) as SortOptionKey[];

export function isSortOptionKey(value: string): value is SortOptionKey {
  return SORT_OPTIONS_KEYS.includes(value as SortOptionKey);
}
