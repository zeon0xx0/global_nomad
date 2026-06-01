import { fetchFromServer } from '@/lib/fetchFromServer';
import type { GetMyInfoSuccessResponse as User } from '@/types/domain/user/types';
import GNBClient from './GnbClient';

export default async function Gnb() {
  let user: User | null = null;

  try {
    const res = await fetchFromServer('/users/me');

    if (!res.ok) {
      // 401, 403 등 에러 응답 처리
      user = null;
    } else {
      user = await res.json();
    }
  } catch (err) {
    console.error('Gnb 유저 정보 fetch 실패:', err);
  }

  return <GNBClient user={user} />;
}
