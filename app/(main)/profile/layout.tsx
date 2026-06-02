import { cookies } from 'next/headers';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ProfileLayout from '@/components/layout/ProfileLayout';
import { getUserMe } from '@/services/users';

export default async function ProfileSectionLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (accessToken) {
    await queryClient.prefetchQuery({
      queryKey: ['myInfo'],
      queryFn: () => getUserMe(accessToken),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileLayout>{children}</ProfileLayout>
    </HydrationBoundary>
  );
}
