'use client';

import Image from 'next/image';
import closeIcon from '@/public/ic_close.svg';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-[20px]">
      <h1 className="text-2xl-bold">{title}</h1>
      <button type="button" onClick={onClose} aria-label="모달 닫기">
        <Image src={closeIcon} alt="닫기" width={25} height={25} />
      </button>
    </div>
  );
}
