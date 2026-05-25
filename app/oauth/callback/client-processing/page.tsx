'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OauthHandlerPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div>
      <p>로그인 처리 중입니다...</p>
    </div>
  );
}
