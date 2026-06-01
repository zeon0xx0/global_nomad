'use client';

import { createPortal } from 'react-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import NotificationPopover from './NotificationPopover';
import NotificationList from './NotificationList';
import Image from 'next/image';
import alarmIcon from '@/public/ic_alarm.svg';
import { useQuery } from '@tanstack/react-query';
import { getMyNotifications } from '@/services/myNotifications';
import type { GetMyInfoSuccessResponse as User } from '@/types/domain/user/types';

interface AlarmButtonProps {
  user?: User;
}

export default function AlarmButton({ user }: AlarmButtonProps) {
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const { data, refetch } = useQuery({
    queryKey: ['myNotificationAlarm', user?.id],
    queryFn: () => getMyNotifications({ size: 10 }),
    staleTime: 1000 * 30,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!user?.id,
    retry: false,
  });

  const notificationsArray = useMemo(() => {
    return Array.isArray(data?.notifications) ? data.notifications : [];
  }, [data]);

  useEffect(() => {
    const lastCheckedAtRaw = localStorage.getItem('lastNotificationCheckedAt');
    const lastCheckedAt = lastCheckedAtRaw ? new Date(lastCheckedAtRaw) : new Date(0);

    const hasNew = notificationsArray.some(n => {
      const createdAt = new Date(n.createdAt);
      return createdAt > lastCheckedAt;
    });

    setHasNewNotification(prev => (prev === hasNew ? prev : hasNew));
  }, [notificationsArray]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedAlarmButton = wrapperRef.current?.contains(target);
      const clickedPopover = popoverRef.current?.contains(target);

      if (!clickedAlarmButton && !clickedPopover) {
        setIsAlarmOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleClick = async () => {
    if (!user?.id) return;

    await refetch();

    setIsAlarmOpen(prev => !prev);
    setHasNewNotification(false);

    localStorage.setItem('lastNotificationCheckedAt', new Date().toISOString());
  };

  const handleClose = () => {
    setIsAlarmOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative flex h-8 w-8 items-center justify-center">
      <button
        onClick={async e => {
          e.stopPropagation();
          await handleClick();
        }}
        className="relative flex h-8 w-8 items-center justify-center transition ease-in-out hover:scale-105"
      >
        <Image src={alarmIcon} alt="알림" width={20} height={20} priority className="h-5 w-5" />

        <span
          className={`absolute right-[5px] top-[5px] h-2 w-2 rounded-full bg-red-500 transition-opacity duration-150 ${
            hasNewNotification ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </button>

      {isAlarmOpen &&
        createPortal(
          <div ref={popoverRef}>
            <NotificationPopover onClose={handleClose}>
              <NotificationList />
            </NotificationPopover>
          </div>,
          document.body,
        )}
    </div>
  );
}
