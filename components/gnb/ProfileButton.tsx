// 'use client';

// import { useRouter } from 'next/navigation';
// import DropdownMenu from '../common/DropDown';
// import Image from 'next/image';
// import { useAuthStore } from '@/store/useAuthStore';
// import { useQueryClient } from '@tanstack/react-query';
// import { UserServiceResponseDto as User } from '@/types';

// interface ProfileButtonProps {
//   user?: User;
// }

// export default function ProfileButton({ user }: ProfileButtonProps) {
//   const router = useRouter();
//   const { setIsLoggedIn, setUser } = useAuthStore();
//   const queryClient = useQueryClient();

//   const handleSelect = async (value: string) => {
//     switch (value) {
//       case '내 정보':
//         router.push('/profile/info');
//         break;

//       case '예약 내역':
//         router.push('/profile/reservations');
//         break;

//       case '내 체험 관리':
//         router.push('/profile/activities');
//         break;
//       case '예약 현황':
//         router.push('/profile/schedule');
//         break;
//       case '로그아웃':
//         try {
//           const response = await fetch('/api/auth/logout', { method: 'POST' });
//           if (response.ok) {
//             setIsLoggedIn(false);
//             setUser(null);
//             queryClient.removeQueries({ queryKey: ['myInfo'] });
//             queryClient.removeQueries({ queryKey: ['myNotificationAlarm'] });
//             router.refresh();
//             router.push('/');
//           } else {
//             console.error('로그아웃에 실패했습니다.');
//           }
//         } catch (error) {
//           console.error('로그아웃 요청 중 오류 발생:', error);
//         }
//         break;
//       default:
//         break;
//     }
//   };

//   if (!user) return null;

//   return (
//     <div className="text-center min-w-[50px]">
//       <DropdownMenu
//         trigger={
//           <button className="flex h-8 min-w-[90px] items-center gap-2 transition ease-in-out hover:scale-105">
//             <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-100">
//               <Image
//                 src={user.profileImageUrl ?? '/ic_profile.svg'}
//                 alt="프로필"
//                 width={32}
//                 height={32}
//                 priority
//                 className="h-full w-full object-cover"
//               />
//             </div>

//             <span className="max-w-[80px] truncate whitespace-nowrap text-sm">
//               {user.nickname}
//             </span>
//           </button>
//         }
//         options={['내 정보', '예약 내역', '내 체험 관리', '예약 현황', '로그아웃']}
//         onSelect={handleSelect}
//       />
//     </div>
//   );
// }

'use client';

import { useRouter } from 'next/navigation';
import DropdownMenu from '../common/DropDown';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import type { GetMyInfoSuccessResponse as User, UploadProfileImageSuccessResponse } from '@/types/domain/user/types';

interface ProfileButtonProps {
  user?: User;
}

export default function ProfileButton({ user }: ProfileButtonProps) {
  const router = useRouter();
  const clearUser = useAuthStore(state => state.clearUser);
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl);
  const setUser = useAuthStore(state => state.setUser);

  const handleProfileImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || !user) return;

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/users/me/image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.error('프로필 이미지 업로드 실패');
      return;
    }

    const data: UploadProfileImageSuccessResponse = await response.json();

    setProfileImageUrl(data.profileImageUrl);
    setUser({
      ...user,
      profileImageUrl: data.profileImageUrl,
    });
  };

  const handleSelect = async (value: string) => {
    switch (value) {
      case '내 정보':
        router.push('/profile/info');
        break;

      case '예약 내역':
        router.push('/profile/reservations');
        break;

      case '내 체험 관리':
        router.push('/profile/activities');
        break;
      case '예약 현황':
        router.push('/profile/schedule');
        break;
      case '프로필 이미지 변경':
        inputRef.current?.click();
        break;
      case '로그아웃':
        try {
          const response = await fetch('/api/auth/logout', { method: 'POST' });

          if (response.ok) {
            clearUser();

            queryClient.removeQueries({ queryKey: ['myInfo'] });
            queryClient.removeQueries({ queryKey: ['myNotificationAlarm'] });

            window.location.href = '/';
          } else {
            console.error('로그아웃에 실패했습니다.');
          }
        } catch (error) {
          console.error('로그아웃 요청 중 오류 발생:', error);
        }
        break;
      default:
        break;
    }
  };

  if (!user) return null;

  return (
    <div className="text-center min-w-[50px]">
      <DropdownMenu
        trigger={
          <button className="flex h-8 min-w-[90px] items-center gap-2 transition ease-in-out hover:scale-105">
            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-100">
              <Image
                src={profileImageUrl ?? '/ic_profile.svg'}
                alt="프로필"
                width={32}
                height={32}
                priority
                className="h-full w-full object-cover"
              />

              <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleProfileImageChange} />
            </div>

            <span className="max-w-[80px] truncate whitespace-nowrap text-sm">{user.nickname}</span>
          </button>
        }
        options={['내 정보', '예약 내역', '내 체험 관리', '예약 현황', '로그아웃']}
        onSelect={handleSelect}
      />
    </div>
  );
}
