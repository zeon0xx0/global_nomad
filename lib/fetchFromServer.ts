// //lib/fetchFromServer.ts
// import { cookies } from 'next/headers';

// export async function fetchFromServer(path: string, options: RequestInit = {}) {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get('accessToken')?.value;

//   //url 이후에 바꿀 것
//   const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sp-globalnomad-api.vercel.app/14-2';

//   const res = await fetch(`${baseUrl}${path}`, {
//     ...options,
//     headers: {
//       'Content-Type': 'application/json',
//       ...(options.headers || {}),
//       ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
//     },
//     cache: 'no-store',
//     credentials: 'include',
//   });

//   if (!res.ok) {
//     throw new Error(`API 요청 실패: ${res.status}`);
//   }
//   return res;
// }

import { cookies } from 'next/headers';

export async function fetchFromServer(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
    throw new Error('BASE_URL 환경변수가 설정되지 않았습니다.');
  }

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      Cookie: cookieStore.toString(),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    cache: 'no-store',
  });

  return res;
}
