// 'use client';

// import Image from 'next/image';
// import Logo from '@/public/ic_logo.svg';
// import Link from 'next/link';
// import { UserServiceResponseDto as User } from '@/types';
// import AlarmButton from './AlarmButton';
// import ProfileButton from './ProfileButton';

// interface GNBClientProps {
//   user: User | null;
// }

// export default function GNBClient({ user }: GNBClientProps) {
//   return (
//     <header className="fixed bg-white z-50 left-0 top-0 w-full px-4 border-b py-[20px]">
//       <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center">
//         <Link href="/">
//           <Image src={Logo} alt="로고" width={172}height={30} priority className="sm:w-[172px] h-auto" />
//         </Link>

//         <div className="flex w-[220px] translate-x-1 items-center justify-start gap-[25px]">
//           {user ? (
//             <>
//               <AlarmButton user={user} />
//               <div className="h-4 w-px bg-gray-300" />
//               <ProfileButton user={user} />
//             </>
//           ) : (
//             <div className="flex items-center gap-[38px]">
//               <Link
//                 href="/login"
//                 className="text-md-medium text-black transition ease-in-out hover:font-bold hover:scale-105"
//               >
//                 로그인
//               </Link>
//               <Link
//                 href="/signup"
//                 className="text-md-medium text-black transition ease-in-out hover:font-bold hover:scale-105"
//               >
//                 회원가입
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

'use client';

import Image from 'next/image';
import Logo from '@/public/ic_logo.svg';
import Link from 'next/link';
import { UserServiceResponseDto as User } from '@/types';
import AlarmButton from './AlarmButton';
import ProfileButton from './ProfileButton';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

interface GNBClientProps {
  user: User | null;
}

export default function GNBClient({ user }: GNBClientProps) {
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);
  return (
    <header className="fixed bg-white z-50 left-0 top-0 w-full px-4 border-b py-[20px]">
      <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center">
        <Link href="/">
          <Image src={Logo} alt="로고" width={172} height={30} priority className="sm:w-[172px] h-auto" />
        </Link>

        <div className="flex w-[220px] translate-x-1 items-center justify-start gap-[25px]">
          {user ? (
            <>
              <AlarmButton user={user} />
              <div className="h-4 w-px bg-gray-300" />
              <ProfileButton user={user} />
            </>
          ) : (
            <div className="flex items-center gap-[38px]">
              <Link
                href="/login"
                className="text-md-medium text-black transition ease-in-out hover:font-bold hover:scale-105"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="text-md-medium text-black transition ease-in-out hover:font-bold hover:scale-105"
              >
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
